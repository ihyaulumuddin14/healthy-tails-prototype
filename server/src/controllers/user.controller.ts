import { Request, Response, NextFunction } from "express";
import {
  getUserById,
  updateUserService,
  changeUserPasswordService,
  uploadAvatarService,
  getAllUsers,
  deleteUserService,
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

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const avatar = req.file;
    const user: UserResponse = await uploadAvatarService(req.user!.id, avatar!);
    return res
      .status(200)
      .json({ message: "Avatar uploaded successfully", user });
  } catch (err) {
    next(err);
  }
};

export const findAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: UserResponse[] = await getAllUsers();
    return res
      .status(200)
      .json({ message: "Users retrieved successfully", users });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteUserService(req.params.id);
    return res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
