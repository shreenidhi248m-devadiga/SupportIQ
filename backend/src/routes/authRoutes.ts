import { Router } from 'express';
import { 
  registerCustomer, 
  loginCustomer, 
  loginAdmin, 
  forgotPassword, 
  resetPassword, 
  verifyEmail 
} from '../controllers/authController';

const router = Router();

// Public Authentication Endpoints
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/admin-login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

export default router;
