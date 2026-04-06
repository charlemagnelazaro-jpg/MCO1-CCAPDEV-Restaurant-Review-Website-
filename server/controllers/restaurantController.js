import Restaurant from '../models/Restaurant.js';
import Review from '../models/Review.js';
import Groq from 'groq-sdk';


// Create a new restaurant
export const createRestaurant = async (req, res) => {
    try {
        const { name, address } = req.body;

        const newRestaurant = await Restaurant.create({ name, address });

        return res.status(201).json({
            success: true,
            restaurant: newRestaurant
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            success: true,
            restaurants: restaurants
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get AI summary for a restaurant
export const getRestaurantSummary = async (req, res) => {
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const { name } = req.params;
        const restaurant = await Restaurant.findOne({ name });

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        //check if cached summary is less than a day old
        if (restaurant.aiSummary?.text && restaurant.aiSummary?.lastUpdated > oneDayAgo) {
            return res.status(200).json({
                success: true,
                summary: restaurant.aiSummary.text,
                lastUpdated: restaurant.aiSummary.lastUpdated
            });
        }

        // fetch all reviews.
        const reviews = await Review.find({ restaurant: restaurant._id });

        if (!reviews || reviews.length === 0) {
            return res.status(200).json({
                success: true,
                summary: "This restaurant currently has no reviews to summarize.",
                lastUpdated: new Date()
            });
        }

        //compile reviews into string block
        const compiledReviews = reviews.map(r => `Title: ${r.title}\nComment: ${r.comment}`).join('\n\n');

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant. Summarize the overall consensus of these restaurant user reviews. Write exactly a short 3-4 sentence paragraph. Return ONLY the text of the summary, without any introductions."
                },
                {
                    role: "user",
                    content: `Reviews for ${restaurant.name}:\n\n${compiledReviews}`
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
            max_tokens: 150,
        });

        const newSummaryText = completion.choices[0]?.message?.content || "Summary could not be generated.";

        restaurant.aiSummary = {
            text: newSummaryText,
            lastUpdated: new Date()
        };

        await restaurant.save();

        res.status(200).json({
            success: true,
            summary: newSummaryText,
            lastUpdated: restaurant.aiSummary.lastUpdated
        });

    } catch (error) {
        console.error("AI Summary error:", error);
        res.status(500).json({ success: false, message: "Failed to generate AI summary" });
    }
};

