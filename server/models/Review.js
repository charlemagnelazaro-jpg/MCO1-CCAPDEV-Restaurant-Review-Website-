import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A review must have an author.']
    }, 
    title: {
        type: String,
        required: [true, 'Please provide a title for your review.'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters.']
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'A review must belong to a restaurant.']
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a numeric rating between 1 and 5.'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Review comment is required.'],
        trim: true
    },
    images: {
        type: [String], 
        default: []
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    totalVoteCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//recompute vote count
reviewSchema.pre('save', function () {
    this.totalVoteCount = this.upvotes.length - this.downvotes.length;
});

reviewSchema.index({ restaurant: 1 });
reviewSchema.index({ user: 1 });

const Review = mongoose.model('Review', reviewSchema);
export default Review;