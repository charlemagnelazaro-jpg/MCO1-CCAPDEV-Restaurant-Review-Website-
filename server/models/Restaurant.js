import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required.'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required.']
    },
    backgroundImg: {
        type: String,
        default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' // Default placeholder
    },
    avgRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    aiSummary: {
        text: String,
        lastUpdated: Date
    }
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;