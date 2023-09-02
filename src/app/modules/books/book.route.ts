import express from 'express';
import requestValidation from '../../middlewares/requestValidation';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  requestValidation(BookValidation.createBooks),
  BookController.createBook
);
router.get('/', BookController.getAllBooks);
router.get('/category/:categoryId', BookController.getBooksByCategoryId);
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  requestValidation(BookValidation.updateBook),
  BookController.updateSingleBooks
);
router.delete('/:id', BookController.deleteSingleBooks);

export const BookRoutes = router;
