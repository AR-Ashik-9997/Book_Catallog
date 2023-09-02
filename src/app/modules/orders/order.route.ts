import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  requestValidation(OrderValidation.createOrder),
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllOrder
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getSingleOrder
);

export const OrderRoutes = router;
