import {
  UpdateUserRequest,
  UpdatePasswordUserRequest,
  UserResponse,
} from "../domain/dto/user.dto.js";
import {
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUserById,
  updateUserPassword,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { Express } from "express";
import { HttpError } from "../utils/http-error.js";
import { deleteCache, getCache, setCache } from "../utils/redis.js";
import { toUserResponse, toUserResponseArray } from "../helpers/user-mapper.js";
import { supabase } from "../config/supabase.js";
import logger from "../utils/logger.js";

export const getUserById = async (id: string) => {
  const cacheKey = `user:${id}`;

  const cachedUser = await getCache<UserResponse>(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }

  const user = await findUserById(id);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const mappedUser = toUserResponse(user);

  await setCache(cacheKey, mappedUser, 3600);

  return mappedUser;
};

export const updateUserService = async (
  id: string,
  payload: UpdateUserRequest
) => {
  const updatedUser = await updateUserById(id, payload);
  if (!updatedUser) {
    throw new HttpError(404, "User not found");
  }

  const cacheKey = `user:${id}`;

  const mappedUser = toUserResponse(updatedUser);

  await setCache(cacheKey, mappedUser, 3600);

  return mappedUser;
};

export const changeUserPasswordService = async (
  id: string,
  payload: UpdatePasswordUserRequest
) => {
  const user = await findUserById(id);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (payload.oldPassword === payload.newPassword) {
    throw new HttpError(400, "New password cannot be the same as old password");
  }

  if (!(await bcrypt.compare(payload.oldPassword, user.password))) {
    throw new HttpError(400, "Old password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(payload.newPassword, 10);

  await updateUserPassword(id, hashedNewPassword);

  const cacheKey = `user:${id}`;
  await deleteCache(cacheKey);
};

export const uploadAvatarService = async (
  id: string,
  avatar: Express.Multer.File
) => {
  if (!avatar) {
    throw new HttpError(400, "Avatar file is required");
  }

  const user = await findUserById(id);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.photoUrl && !user.photoUrl.includes("default_pfp.jpg")) {
    try {
      const urlParts = user.photoUrl.split("/media/");
      if (urlParts.length > 1) {
        const oldFilePath = urlParts[1];
        await supabase.storage.from("media").remove([oldFilePath]);
      }
    } catch (err) {
      logger.error("Failed to remove old avatar:", err);
    }
  }

  const fileName = `profile/${id}/${Date.now()}_${avatar.originalname}`;

  const { data, error } = await supabase.storage
    .from("media")
    .upload(fileName, avatar.buffer, {
      cacheControl: "3600",
      contentType: avatar.mimetype,
    });

  if (error) {
    throw new HttpError(500, "Failed to upload avatar");
  }

  const { data: publicUrlData } = supabase.storage
    .from("media")
    .getPublicUrl(data.path);

  const mediaUrl = publicUrlData.publicUrl;

  const updatedUser = await updateUserById(id, { photoUrl: mediaUrl });

  if (!updatedUser) {
    throw new HttpError(404, "User not found after update");
  }

  return toUserResponse(updatedUser);
};

export const getAllUsers = async () => {
  const cacheKey = `users:all`;

  const cachedUsers = await getCache<UserResponse[]>(cacheKey);
  if (cachedUsers) {
    return cachedUsers;
  }

  const users = await findAllUsers();
  const mappedUsers = toUserResponseArray(users);

  await setCache(cacheKey, mappedUsers, 3600);

  return mappedUsers;
};

export const deleteUserService = async (id: string) => {
  const deletedUser = await deleteUserById(id);
  if (!deletedUser) {
    throw new HttpError(404, "User not found");
  }

  await deleteCache(`users:all`);
  await deleteCache(`user:${id}`);
};
