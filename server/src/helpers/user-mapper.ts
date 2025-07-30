import { UserItf } from "../domain/entity/user.entity.js";

export const toUserResponse = (user: UserItf) => {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.verified,
  };
};
