import { UserItf } from "../domain/entity/user.entity.js";

export const toUserResponse = (user: UserItf) => {
  const userObject = user.toObject();
  return {
    _id: user._id.toString(),
    name: userObject.name,
    email: userObject.email,
    role: userObject.role,
    verified: userObject.verified,
    photoUrl: userObject.photoUrl,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

export const toUserResponseArray = (usersArray: UserItf[]) => {
  return usersArray.map(toUserResponse);
};
