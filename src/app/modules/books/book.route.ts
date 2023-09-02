import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  requestValidation(BookValidation.createBooks),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.get('/', BookController.getAllBooks);
router.get('/category/:categoryId', BookController.getBooksByCategoryId);
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  requestValidation(BookValidation.updateBook),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateSingleBooks
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteSingleBooks
);

export const BookRoutes = router;
