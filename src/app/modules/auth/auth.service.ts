/* eslint-disable no-unused-vars */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, IUserLoginResponse } from './auth.interface';

const createUser = async (payload: User): Promise<Omit<User, 'password'>> => {
  const result = await prisma.user.create({
    data: payload,
  });
  const { password: _, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

const LoginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const user = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user?.password !== payload?.password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
  }
  const { id, role } = user;
  const token = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return { token, refreshToken };
};

export const AuthService = { createUser, LoginUser };
