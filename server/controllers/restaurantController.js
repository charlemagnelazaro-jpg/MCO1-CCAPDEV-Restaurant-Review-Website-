import Restaurant from '../models/Restaurant.js';

//---------------------testing--------------------------
// Create a new restaurant
export const createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
        
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all restaurants 
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//------------------------------------------------------
