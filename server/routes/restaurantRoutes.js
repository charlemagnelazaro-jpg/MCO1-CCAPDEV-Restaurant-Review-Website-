import express from 'express';
import { createRestaurant, getAllRestaurants } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/createRestaurant', createRestaurant);
router.get('/getAllRestaurants', getAllRestaurants);
export default router;