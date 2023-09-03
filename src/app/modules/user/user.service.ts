/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { UserWithoutPassword } from './user.interface';

const getAllUsers = async (): Promise<UserWithoutPassword[]> => {
  const result = await prisma.user.findMany();
  const usersWithoutPassword: UserWithoutPassword[] = result.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  return usersWithoutPassword;
};

const getSingleUser = async (
  id: string
): Promise<UserWithoutPassword | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  const { password, ...userWithoutPassword } = result;

  return userWithoutPassword;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<User> => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  return await prisma.$transaction(async tx => {
    await tx.order.deleteMany({ where: { userId: id } });
    const result = await tx.user.delete({
      where: { id },
    });
    return result;
  });
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
