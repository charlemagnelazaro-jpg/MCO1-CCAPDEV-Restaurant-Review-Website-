import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import Restaurant from '../models/Restaurant.js';
import mongoose from 'mongoose';

export const register = async (req, res) => { 
    try {
        const { email, password, role, restaurantID} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }
        
        const userData = {
            email,
            password,
            role
        };
        if (role === "owner") {
            try {
                const objectId = new mongoose.Types.ObjectId(restaurantID.trim());
                const findRestaurant = await Restaurant.findById(objectId);
                if (!findRestaurant) {
                    return res.status(404).json({
                        success: false,
                        message: "Restaurant not found. Please check the ID and try again."
                    });
                }
                userData.restaurantID = objectId;
            } catch (err) {
                return res.status(404).json({
                    success: false,
                    message: "Restaurant not found. Please check the ID and try again."
                });
            }
        }
        const user = new User(userData);
        await user.save();
        res.status(201).json({ success: true, user: user.toJSON() });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        req.session.userId = user._id;

        res.json({ success: true, user: user.toJSON() });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST logout user
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ success: false, message: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Logged out' });
    });
};

// GET check session
export const checkSession = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.json({ user: null });
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.json({ user: null });
        }

        res.json({ user: user.toJSON() });
    } catch (error) {
        console.error('Check session error:', error);
        res.status(500).json({ user: null });
    }
};

// Get all users raw for testing
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT update user profile
export const updateProfile = async (req, res) => {
    try {
        const { name, location, bio } = req.body;

        const updateData = { name, location, bio };

        // if pic was uploaded, upload to cloudinary
        if (req.files && req.files.avatar) {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            const avatar = req.files.avatar;
            const base64 = `data:${avatar.mimetype};base64,${avatar.data.toString('base64')}`;

            const result = await cloudinary.uploader.upload(base64, {
                folder: 'archereats_profiles',
                transformation: [
                    { width: 256, height: 256, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'auto' }
                ]
            });
            updateData.img = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user: updatedUser.toJSON() });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
