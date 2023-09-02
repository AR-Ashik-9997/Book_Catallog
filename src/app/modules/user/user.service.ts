/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { User } from '@prisma/client';
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
    return null;
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
    include: { ReviewAndRating: true, Order: true },
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: { id },
    include: { ReviewAndRating: true, Order: true },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
