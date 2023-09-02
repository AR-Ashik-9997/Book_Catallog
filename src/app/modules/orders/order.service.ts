import { Order } from '@prisma/client';
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

export const OrderService = { createOrder };
