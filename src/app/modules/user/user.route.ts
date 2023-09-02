import express from 'express';
import requestValidation from '../../middlewares/requestValidation';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getSingleUser);
router.patch(
  '/:id',
  requestValidation(UserValidation.updateUser),
  UserController.updateSingleUser
);
router.delete('/:id', UserController.deleteSingleUser);

export const UserRoutes = router;
