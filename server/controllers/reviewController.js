import Review from "../models/Review.js";
import { v2 as cloudinary } from 'cloudinary';

export const postReviews = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { user, title, restaurant, rating, comment, images } = req.body;

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
            restaurant,
            rating,
            comment,
            images: uploadedImages
        });
        res.status(200).json(review);
    } catch (error) {
        console.error("Cloudinary/DB Error:", error);
        res.status(400).json({ error: error.message });
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

/*Notes
    recompute the restaurant's avgRating after every change to a review
*/