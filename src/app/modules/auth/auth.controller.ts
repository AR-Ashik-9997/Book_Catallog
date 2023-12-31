import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse, { sendLoginResponse } from '../../../shared/sendResponse';
import { IUserLoginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUser(userData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  });
});

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.LoginUser(loginData);
  const { refreshToken, ...other } = result;
  const cookie = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookie);
  sendLoginResponse<IUserLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token: other.token as any,
  });
});

export const AuthController = { createUser, LoginUser };
