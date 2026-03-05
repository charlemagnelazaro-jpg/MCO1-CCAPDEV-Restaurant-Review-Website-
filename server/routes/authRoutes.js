import express from 'express';
import { register, login, logout, checkSession, updateProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/check-session', checkSession);
router.put('/profile', isAuthenticated, updateProfile);

export default router;
