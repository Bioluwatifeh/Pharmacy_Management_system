import express from 'express';
import {
  createWholesaleOrder,
  getMyWholesaleOrders,
  getPendingOrders,
  approveWholesaleOrder,
  markOrderReady,
  completeWholesaleOrder
} from '../controllers/wholesale.controller.js';

import { verifyUser } from '../middlewares/auth.middleware.js';
import { allowRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', verifyUser, allowRoles('WHOLESALE_CUSTOMER'), createWholesaleOrder);
router.get('/my', verifyUser, allowRoles('WHOLESALE_CUSTOMER'), getMyWholesaleOrders);

router.get('/pending', verifyUser, allowRoles('PHARMACIST'), getPendingOrders);
router.put('/:id/approve', verifyUser, allowRoles('PHARMACIST'), approveWholesaleOrder);

router.put('/:id/ready', verifyUser, allowRoles('INVENTORY_MANAGER'), markOrderReady);
router.put('/:id/complete', verifyUser, allowRoles('CASHIER'), completeWholesaleOrder);

export default router;
