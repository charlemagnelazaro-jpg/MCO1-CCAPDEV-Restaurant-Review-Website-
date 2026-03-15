import express from 'express';
import { postReviews, getAllReviews, getReviewsByRestaurant, updateVotes, addReplyToReview, updateAvgRating, getRecentReviews, getReviewsByUser } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', postReviews);
router.get('/', getRecentReviews);
router.get('/restaurant/:name', getReviewsByRestaurant);
router.get('/user/:id', getReviewsByUser);
router.patch('/vote/:id', updateVotes);
router.patch('/reply/:id', addReplyToReview);
router.patch('/updateAvgRating/:id', updateAvgRating)
export default router;
