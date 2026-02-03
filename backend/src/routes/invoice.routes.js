import express from 'express';
import { getInvoiceBySaleId } from '../controllers/invoice.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { allowRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get(
  '/:saleId',
  verifyUser,
  allowRoles('ADMIN', 'CASHIER'),
  getInvoiceBySaleId
);

export default router;
