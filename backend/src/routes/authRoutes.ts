import { Router } from 'express';
import { registerCustomer, loginCustomer, loginAdmin } from '../controllers/authController';

const router = Router();

// Public Authentication Endpoints
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/admin-login', loginAdmin);

export default router;
