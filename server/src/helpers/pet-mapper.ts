import { PetItf } from "../domain/entity/pet.entity.js";

import { toUserResponse } from "./user-mapper.js";

export const toPetResponse = (pet: PetItf) => {
  return {
    ...pet.toObject(),
    _id: pet._id.toString(),
    birthDate: pet.birthDate?.toISOString(),
    owner: toUserResponse(pet.owner),
    createdAt: pet.createdAt.toISOString(),
    updatedAt: pet.updatedAt.toISOString(),
  };
};

export const toNestedPetResponse = (pet: PetItf) => {
  const petObj = pet.toObject();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { owner, ...petWithoutOwner } = petObj;
  return {
    ...petWithoutOwner,
    _id: pet._id.toString(),
    birthDate: pet.birthDate?.toISOString(),
    createdAt: pet.createdAt.toISOString(),
    updatedAt: pet.updatedAt.toISOString(),
  };
};

export const toPetResponseArray = (petsArray: PetItf[]) => {
  return petsArray.map((pet) => toPetResponse(pet));
};
