import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  requestValidation(CategoryValidation.createCategory),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);
router.patch(
  '/:id',
  requestValidation(CategoryValidation.updateCategory),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateSingleCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteSingleCategory
);

export const CategoryRoutes = router;
