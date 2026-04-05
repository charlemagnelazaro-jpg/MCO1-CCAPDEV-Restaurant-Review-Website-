import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const isNotAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return next();
        }
        return res.status(403).json({ success: false, message: 'Forbidden' });
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            return next();
        }
        return res.status(403).json({ success: false, message: 'Admins only' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};