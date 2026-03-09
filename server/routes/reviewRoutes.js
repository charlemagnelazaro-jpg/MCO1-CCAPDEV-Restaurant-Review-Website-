import express from 'express';
import { postReviews, getAllReviews, getReviewsByRestaurant, updateVotes, addReplyToReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', postReviews);
router.get('/', getAllReviews); //For testing
router.get('/restaurant/:name', getReviewsByRestaurant);
router.patch('/vote/:id', updateVotes);
router.patch('/reply/:id', addReplyToReview);
export default router;
