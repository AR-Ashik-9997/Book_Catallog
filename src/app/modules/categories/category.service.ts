import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createCategory = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};
const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: { books: true },
  });
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: { books: true },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return result;
};
const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteSingleCategory = async (id: string): Promise<Category> => {
  const existingCategory = await prisma.category.findUnique({ where: { id } });
  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  return await prisma.$transaction(async tx => {
    await tx.book.deleteMany({ where: { categoryId: id } });
    const result = await tx.category.delete({
      where: {
        id,
      },
    });
    return result;
  });
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
