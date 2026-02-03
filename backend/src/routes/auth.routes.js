import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { registerWholesaleCustomer, login } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/login', login);
router.post('/logout', verifyUser, logout);

router.post('/wholesale/register', registerWholesaleCustomer);

export default router;