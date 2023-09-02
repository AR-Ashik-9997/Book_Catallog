import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';
import { JwtPayload } from 'jsonwebtoken';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const result = await ProfileService.getProfile(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = { getProfile };
