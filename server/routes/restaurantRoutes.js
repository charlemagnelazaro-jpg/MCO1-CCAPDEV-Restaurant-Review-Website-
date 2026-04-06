import express from 'express';
import { createRestaurant, getAllRestaurants, getRestaurantSummary, updateRestaurantImage } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/createRestaurant', createRestaurant);
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/summary/:name', getRestaurantSummary);
router.patch('/updateImage/:name', updateRestaurantImage);
export default router;