import express from 'express';
import { createRestaurant, getAllRestaurants, getRestaurantSummary } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/createRestaurant', createRestaurant);
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/summary/:name', getRestaurantSummary);
export default router;