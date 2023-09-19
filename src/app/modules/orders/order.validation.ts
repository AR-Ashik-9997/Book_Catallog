import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({ required_error: 'bookId is required' }),
        quantity: z.number({ required_error: 'bookQuantity is required' }),
      })
    ),
  }),
});

export const OrderValidation = { createOrder };
