import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import customerRoutes from './customer.routes.js';
import saleRoutes from './sale.routes.js';
import wholesaleRoutes from './wholesale.routes.js';
import invoiceRoutes from './invoice.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/sales', saleRoutes);
router.use('/wholesale-orders', wholesaleRoutes);
router.use('/invoices', invoiceRoutes);

export default router;
