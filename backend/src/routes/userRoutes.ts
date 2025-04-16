import { Router } from 'express';
import { 
  register, 
  login, 
  logout,
  getProfile, 
  updateProfile, 
  changePassword 
} from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected routes (cần xác thực)
router.post('/auth/logout', auth, logout);
router.get('/users/profile', auth, getProfile);
router.put('/users/profile', auth, updateProfile);
router.put('/users/password', auth, changePassword);

export default router;