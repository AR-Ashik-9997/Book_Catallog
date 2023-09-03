import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req?.params?.categoryId;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getBooksByCategoryId(
    categoryId,
    paginationOptions
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book fetched successfully',
    data: result,
  });
});
const updateSingleBooks = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...bookData } = req.body;
  const result = await BookService.updateSingleBooks(id, bookData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});
const deleteSingleBooks = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteSingleBooks(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getSingleBook,
  updateSingleBooks,
  deleteSingleBooks,
};
