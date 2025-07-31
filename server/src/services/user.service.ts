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
import { HttpError } from "../utils/http-error.js";
import { deleteCache, getCache, setCache } from "../utils/redis.js";
import { toUserResponse, toUserResponseArray } from "../helpers/user-mapper.js";

export const getUserById = async (id: string) => {
  const cacheKey = `user:${id}`;

  const cachedUser = await getCache<UserResponse>(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }

  const user = await findUserById(id);
  if (!user) {
    throw new HttpError(403, "Unauthorized access");
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
    throw new HttpError(403, "Unauthorized access");
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
    throw new HttpError(403, "Unauthorized access");
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
  await deleteUserById(id);

  await deleteCache(`users:all`);
  await deleteCache(`user:${id}`);
};
