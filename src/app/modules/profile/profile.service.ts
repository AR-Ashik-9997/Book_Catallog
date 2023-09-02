/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getProfile = async (
  user: JwtPayload
): Promise<Omit<User, 'id'> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (result) {
    const { id, ...profileWithoutId } = result;
    return profileWithoutId;
  }

  return null;
};

export const ProfileService = { getProfile };
