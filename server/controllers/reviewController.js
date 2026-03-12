import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary';

export const postReviews = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { user, title, restaurant, rating, comment, images } = req.body;
    const resto = await Restaurant.findOne({ name: restaurant });

    try {
        //upload images to cloudinary
        let uploadedImages = [];
        if (images && images.length > 0) {
            const uploadPromises = images.map((image) => {
                return cloudinary.uploader.upload(image, {
                    folder: 'archereats_reviews',
                });
            });
            const results = await Promise.all(uploadPromises);
            uploadedImages = results.map(result => result.secure_url);
        }

        const review = await Review.create({
            user,
            title,
            restaurant: resto._id,
            rating,
            comment,
            images: uploadedImages
        });

        //find user and increament its respective review count
        await User.findByIdAndUpdate(user, { $inc: { 'stats.reviews': 1 } });

        res.status(200).json(review);
    } catch (error) {
        console.error("Cloudinary/DB Error:", error);
        res.status(400).json({ error: error.message });
    }
}

export const updateAvgRating = async (req, res) => {
    try {
        const resto = await Restaurant.findOne({ name: req.params.id });
        if (!resto) return res.status(404).json({ error: "Restaurant not found" });

        const allReviews = await Review.find({ restaurant: resto._id });
        const newTotalReviews = allReviews.length;
        const newAvgRating = newTotalReviews > 0
            ? Math.round((allReviews.reduce((sum, rev) => sum + rev.rating, 0) / newTotalReviews) * 10) / 10
            : 0;

        await Restaurant.findByIdAndUpdate(resto._id, {
            avgRating: newAvgRating,
            totalReviews: newTotalReviews
        });

        res.status(200).json({ avgRating: newAvgRating, totalReviews: newTotalReviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllReviews = async (req, res) => { //for testing
    try {
        const reviews = await Review.find().populate('user', 'name img').sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getRecentReviews = async (req, res) => { //get 10 latest reviews
    try {
        const reviews = await Review.find().populate('user', 'name img').sort({ createdAt: -1 }).limit(10);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getReviewsByRestaurant = async (req, res) => {
    try {
        const resto = await Restaurant.findOne({ name: req.params.name });
        if (!resto) return res.status(404).json({ error: "Restaurant not found" });

        const reviews = await Review.find({ restaurant: resto._id }).populate('user', 'name img').sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateVotes = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ error: "Review not found" });

        const userId = req.body.user;
        const voteType = req.body.voteType;

        // Track whether this user was already upvoting before they clicked
        const wasUpvoting = review.upvotes.includes(userId);

        //remove user from both arrays to remove previous vote
        review.upvotes = review.upvotes.filter(id => id.toString() !== userId);
        review.downvotes = review.downvotes.filter(id => id.toString() !== userId);

        let voteDelta = 0;

        //append to voters array and calculate vote delta
        if (voteType === 'upvote') {
            review.upvotes.push(userId);
            if (!wasUpvoting) voteDelta = 1; // they were not upvoting, now they are
        } else if (voteType === 'downvote') {
            review.downvotes.push(userId);
            if (wasUpvoting) voteDelta = -1; // they were upvoting, now they are downvoting
        } else if (voteType === 'none') {
            if (wasUpvoting) voteDelta = -1; // they were upvoting, now they removed their vote
        }

        // if the total number of upvotes changed, update the review's user's helpful votes
        if (voteDelta !== 0) {
            await User.findByIdAndUpdate(review.user, { $inc: { 'stats.helpfulVotes': voteDelta } });
        }

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addReplyToReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ error: "Review not found" });

        // check if user is actually an owner
        const user = await User.findById(req.body.userId);
        if (!user || user.role !== 'owner') return res.status(403).json({ error: "Unauthorized" });

        review.reply = {
            text: req.body.replyText,
            createdAt: new Date()
        };

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/*Notes
    recompute the restaurant's avgRating after every change to a review

*/