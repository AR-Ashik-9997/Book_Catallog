import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({ data: payload });
  return result;
};
const getAllBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: { ReviewAndRating: true, OrderedBook: true },
  });
  return result;
};
const getBooksByCategoryId = async (id: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: { categoryId: id },
    include: { ReviewAndRating: true, OrderedBook: true },
  });
  return result;
};
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
    include: { ReviewAndRating: true, OrderedBook: true },
  });
  return result;
};
const updateSingleBooks = async (
  id: string,
  payload: Partial<Book>
): Promise<Partial<Book>> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
    include: { ReviewAndRating: true, OrderedBook: true },
  });
  return result;
};
const deleteSingleBooks = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: { id },
    include: { ReviewAndRating: true, OrderedBook: true },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getSingleBook,
  updateSingleBooks,
  deleteSingleBooks,
};
