import express from 'express';
import { getMedicines } from '../controllers/medicine.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { allowRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get(
  '/',
  verifyUser,
  allowRoles('ADMIN', 'CASHIER', 'INVENTORY_MANAGER'),
  getMedicines
);

export default router;
