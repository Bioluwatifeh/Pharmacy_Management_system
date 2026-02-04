import express from 'express';
import { logout, getCurrentUser } from '../controllers/auth.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { registerWholesaleCustomer, login } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/login', login);
router.get('/me', verifyUser, getCurrentUser);
router.post('/logout', verifyUser, logout);

router.post('/wholesale/register', registerWholesaleCustomer);

export default router;