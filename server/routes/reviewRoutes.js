import express from 'express';
import { postReviews, getAllReviews, getReviewsByRestaurant, updateVotes } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', postReviews);
router.get('/', getAllReviews); //For testing
router.get('/restaurant/:name', getReviewsByRestaurant);
router.patch('/vote/:id', updateVotes);
export default router;
