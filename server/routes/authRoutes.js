import express from 'express';
import { register, login, logout, checkSession, updateProfile } from '../controllers/authController.js';
import { isAuthenticated, isNotAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/check-session', checkSession);
router.put('/profile', isAuthenticated, isNotAdmin, updateProfile);

export default router;
