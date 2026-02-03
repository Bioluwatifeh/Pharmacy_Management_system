import express from 'express';
import { createRetailSale } from '../controllers/sale.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { allowRoles } from '../middlewares/role.middleware.js';
import {
  getRetailSales,
  getRetailSaleById
} from '../controllers/sale.controller.js';

router.get(
  '/retail',
  verifyUser,
  allowRoles('ADMIN', 'CASHIER'),
  getRetailSales
);

router.get(
  '/retail/:id',
  verifyUser,
  allowRoles('ADMIN', 'CASHIER'),
  getRetailSaleById
);


router.post(
  '/retail',
  verifyUser,
  allowRoles('CASHIER'),
  createRetailSale
);

export default router;
