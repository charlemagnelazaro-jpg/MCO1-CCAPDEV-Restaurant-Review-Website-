import Review from "../models/Review.js";

export const postReviews = async (req, res) => { 
    const { user, title, restaurant, rating, comment, images } = req.body;

    try {
        const review = await Review.create({
            user,
            title,
            restaurant,
            rating,
            comment,
            images
        });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllReviews = async (req, res) =>{ //for testing
    try {
        const reviews = await Review.find();

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/*Notes
    recompute the restaurant's avgRating after every change to a review
*/