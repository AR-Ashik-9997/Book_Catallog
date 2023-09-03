import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './book.constant';
import { IBookFilter } from './book.interface';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: { category: true },
  });
  return result;
};
const getAllBooks = async (
  filters: IBookFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { search, ...filtersData } = filters;

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    const filterConditions = Object.keys(filtersData).map(key => {
      if (key === 'maxPrice') {
        return {
          price: {
            lte: parseFloat(filtersData[key] as string),
          },
        };
      }
      if (key === 'minPrice') {
        return {
          price: {
            gte: parseFloat(filtersData[key] as string),
          },
        };
      }
      if (key === 'price') {
        return {
          [key]: {
            equals: parseFloat(filtersData[key] as string),
          },
        };
      }
      if (key === 'category') {
        return {
          categoryId: {
            equals: (filtersData as any)[key],
          },
        };
      }
      return {
        [key]: {
          equals: (filtersData as any)[key],
        },
      };
    });

    andConditions.push({ AND: filterConditions });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const { page, size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const result = await prisma.book.findMany({
    where: whereConditions,
    include: { category: true },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            price: 'asc',
          },
  });

  const total = await prisma.book.count();
  const totalPages = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPages,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: { categoryId },
    include: { category: true },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            title: 'asc',
          },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const total = await prisma.book.count();
  const totalPages = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPages,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return result;
};
const updateSingleBooks = async (
  id: string,
  payload: Partial<Book>
): Promise<Partial<Book>> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteSingleBooks = async (id: string): Promise<Book> => {
  const existingBook = await prisma.book.findUnique({ where: { id } });
  if (!existingBook) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const result = await prisma.book.delete({
    where: { id },
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
