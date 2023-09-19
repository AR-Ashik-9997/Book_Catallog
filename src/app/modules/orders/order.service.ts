import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICreateOrderedBook } from './order.interface';

const createOrder = async (
  payload: ICreateOrderedBook,
  user: JwtPayload
): Promise<Order> => {
  if (user?.role !== 'customer') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to create'
    );
  }
  const result = await prisma.order.create({
    data: {
      userId: user?.userId,
      orderedBooks: payload.orderedBooks,
    },
  });
  return result;
};

const getAllOrder = async (user: JwtPayload): Promise<Order[]> => {
  if (user.role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });
    return result;
  } else {
    const result = await prisma.order.findMany();
    return result;
  }
};

const getSingleOrder = async (
  id: string,
  user: JwtPayload
): Promise<Order | null> => {
  const existngorder = await prisma.order.findFirst({
    where: { userId: user.userId },
  });
  if (existngorder && user.role === 'customer') {
    return await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } else {
    return await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
