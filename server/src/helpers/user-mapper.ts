import { UserItf } from "../domain/entity/user.entity.js";

export const toUserResponse = (user: UserItf) => {
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.verified,
    photoUrl: user.photoUrl,
  };
};

export const toUserResponseArray = (usersArray: UserItf[]) => {
  return usersArray.map(toUserResponse);
};
