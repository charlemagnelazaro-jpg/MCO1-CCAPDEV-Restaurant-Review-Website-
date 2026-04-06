import express from 'express';
import { createRestaurant, getAllRestaurants } from '../controllers/restaurantController.js';
import { updateGoogleMapsURL } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/createRestaurant', createRestaurant);
router.get('/getAllRestaurants', getAllRestaurants);
router.patch('/:id/google-maps-url', updateGoogleMapsURL);
export default router;