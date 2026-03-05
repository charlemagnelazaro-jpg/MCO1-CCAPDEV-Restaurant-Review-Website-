import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: 'New User'
    },
    location: {
        type: String,
        default: 'Unknown Location'
    },
    bio: {
        type: String,
        default: 'No bio yet.'
    },
    role: {
        type: String,
        enum: ['user', 'admin','owner'],
        default: 'user'
    },
    img: {
        type: String,
        default: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg'
    },
    stats: {
        reviews: { type: Number, default: 0 },
        photos: { type: Number, default: 0 },
        followers: { type: Number, default: 0 }
    },
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Remove password when converting to JSON
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = mongoose.model('User', userSchema);
export default User;
