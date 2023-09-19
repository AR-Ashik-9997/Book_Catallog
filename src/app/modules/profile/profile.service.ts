/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getProfile = async (
  user: JwtPayload
): Promise<Omit<User, 'id'> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  const { id, ...profileWithoutId } = result;
  return profileWithoutId;
};

export const ProfileService = { getProfile };
