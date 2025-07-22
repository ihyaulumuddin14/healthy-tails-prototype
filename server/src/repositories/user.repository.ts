import UserModel, { UserItf } from "../domain/entity/user.entity";

export const findUserByEmail = async (
  email: string
): Promise<UserItf | null> => {
  return UserModel.findOne({ email }).exec();
};

export const findUserByRefreshToken = async (
  refreshToken: string
): Promise<UserItf | null> => {
  return UserModel.findOne({ refreshToken }).exec();
};

export const createUser = async (data: Partial<UserItf>): Promise<UserItf> => {
  const user = new UserModel(data);
  return user.save();
};

export const updateUserByEmail = async (
  email: string,
  updateData: Partial<UserItf>
): Promise<UserItf | null> => {
  return UserModel.findOneAndUpdate({ email }, updateData, {
    new: true,
  }).exec();
};

export const removeRefreshToken = async (
  refreshToken: string
): Promise<UserItf | null> => {
  return UserModel.findOneAndUpdate(
    { refreshToken },
    { $unset: { refreshToken: "" } }
  ).exec();
};
