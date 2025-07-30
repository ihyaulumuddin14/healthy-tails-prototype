import { Request, Response, NextFunction } from "express";
import {
  getUserById,
  updateUserService,
  changeUserPasswordService,
} from "../services/user.service.js";
import { UserResponse } from "../domain/dto/user.dto.js";

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserResponse = await getUserById(req.user!.id);
    return res
      .status(200)
      .json({ message: "User retrieved successfully", user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserResponse = await updateUserService(req.user!.id, req.body);
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    next(err);
  }
};

export const changeUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await changeUserPasswordService(req.user!.id, req.body);
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};
