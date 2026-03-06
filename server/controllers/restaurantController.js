import Restaurant from '../models/Restaurant.js';

//---------------------testing--------------------------
// Create a new restaurant
export const createRestaurant = async (req, res) => {
    try {
        const { name, address } = req.body;
        
        const newRestaurant = await Restaurant.create({ name, address });

        return res.status(201).json({ 
            success: true, 
            restaurant: newRestaurant 
        });

    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Get all restaurants 
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            success: true,
            restaurants: restaurants 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//------------------------------------------------------
