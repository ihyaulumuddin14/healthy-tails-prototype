import UserModel, { UserItf } from "../domain/entity/user.entity";

export const findUserByEmail = async (
  email: string
): Promise<UserItf | null> => {
  const query = UserModel.findOne({ email });
  return query.exec();
};

export const createUser = async (data: Partial<UserItf>): Promise<UserItf> => {
  const user = new UserModel(data);
  return user.save();
};

export const updateUserByEmail = async (
  email: string,
  updateData: Partial<UserItf>
) => {
  return UserModel.findOneAndUpdate({ email }, updateData, { new: true });
};
