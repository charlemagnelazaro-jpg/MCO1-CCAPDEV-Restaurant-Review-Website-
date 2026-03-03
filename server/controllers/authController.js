import User from '../models/User.js';

// POST register new user
export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const user = new User({
            email,
            password,
            name: name || 'New User'
        });

        await user.save();

        req.session.userId = user._id;

        res.status(201).json({ success: true, user: user.toJSON() });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
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
