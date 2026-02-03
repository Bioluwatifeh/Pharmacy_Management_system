import express from 'express';
import {
  getPendingWholesaleCustomers,
  approveWholesaleCustomer,
  rejectWholesaleCustomer
} from '../controllers/customer.controller.js';

import { verifyUser } from '../middlewares/auth.middleware.js';
import { allowRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get(
  '/pending',
  verifyUser,
  allowRoles('ADMIN'),
  getPendingWholesaleCustomers
);

router.put(
  '/:id/approve',
  verifyUser,
  allowRoles('ADMIN'),
  approveWholesaleCustomer
);

router.put(
  '/:id/reject',
  verifyUser,
  allowRoles('ADMIN'),
  rejectWholesaleCustomer
);

export default router;
