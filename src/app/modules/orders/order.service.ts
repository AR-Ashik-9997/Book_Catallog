import { Order } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import { ICreateOrderedBook } from './order.interface';

const createOrder = async (
  payload: ICreateOrderedBook,
  userId: string
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: payload.orderedBooks,
    },
  });
  return result;
};

const getAllOrder = async (user: JwtPayload): Promise<Order[]> => {
  if (user.role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
    });
    return result;
  } else {
    const result = await prisma.order.findMany();
    return result;
  }
};

const getSingleOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const OrderService = { createOrder, getAllOrder, getSingleOrder };
