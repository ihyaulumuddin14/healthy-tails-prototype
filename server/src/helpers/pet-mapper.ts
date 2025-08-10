import { PetItf } from "../domain/entity/pet.entity.js";

export const toPetResponse = (pet: PetItf) => {
  return {
    _id: pet._id.toString(),
    name: pet.name,
    type: pet.type,
    race: pet.race,
    color: pet.color,
    birthDate: pet.birthDate ? pet.birthDate.toISOString() : undefined,
    age: pet.age,
    gender: pet.gender,
  };
};

export const toPetResponseArray = (petsArray: PetItf[]) => {
  return petsArray.map(toPetResponse);
};
