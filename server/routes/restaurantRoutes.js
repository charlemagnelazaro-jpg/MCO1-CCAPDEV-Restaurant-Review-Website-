import express from 'express';
import { createRestaurant, getAllRestaurants } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
export default router;