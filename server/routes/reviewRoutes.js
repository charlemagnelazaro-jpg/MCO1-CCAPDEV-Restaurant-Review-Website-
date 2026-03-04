import express from 'express';
import { postReviews, getAllReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', postReviews);
router.get('/', getAllReviews); //For testing

export default router;
