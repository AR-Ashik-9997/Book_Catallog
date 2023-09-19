/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const user: JwtPayload = req.user!;
  const result = await OrderService.createOrder(orderData, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const result = await OrderService.getAllOrder(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const id = req.params.id;
  const result = await OrderService.getSingleOrder(id,user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
