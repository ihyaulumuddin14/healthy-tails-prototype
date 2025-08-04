import UserModel, { UserItf } from "../domain/entity/user.entity.js";

export const findAllUsers = async (): Promise<UserItf[]> => {
  return UserModel.find().exec();
};

export const findUserById = async (id: string): Promise<UserItf | null> => {
  return UserModel.findById(id).exec();
};

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

export const updateUserById = async (
  id: string,
  updateData: Partial<UserItf>
): Promise<UserItf | null> => {
  return UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

export const updateUserPassword = async (
  id: string,
  password: string
): Promise<UserItf | null> => {
  return UserModel.findByIdAndUpdate(id, { password }, { new: true }).exec();
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

export const deleteUserById = async (id: string): Promise<UserItf | null> => {
  return UserModel.findByIdAndDelete(id).exec();
};

export const deleteUnverifiedUsers = async () => {
  return UserModel.deleteMany({
    verified: false,
    createdAt: {
      $lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  });
};
