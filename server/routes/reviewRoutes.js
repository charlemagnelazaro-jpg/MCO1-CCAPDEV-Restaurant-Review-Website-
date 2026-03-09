import express from 'express';
import { postReviews, getAllReviews, getReviewsByRestaurant, updateVotes, addReplyToReview, updateAvgRating } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', postReviews);
router.get('/', getAllReviews); //For testing
router.get('/restaurant/:name', getReviewsByRestaurant);
router.patch('/vote/:id', updateVotes);
router.patch('/reply/:id', addReplyToReview);
router.patch('/updateAvgRating/:id', updateAvgRating)
export default router;
