import express from 'express';
import requestValidation from '../../middlewares/requestValidation';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  requestValidation(CategoryValidation.createCategory),
  CategoryController.createCategory
);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);
router.patch(
  '/:id',
  requestValidation(CategoryValidation.updateCategory),
  CategoryController.updateSingleCategory
);
router.delete('/:id', CategoryController.deleteSingleCategory);

export const CategoryRoutes = router;
