import { CreatePetRequest } from "../domain/dto/pet.dto.js";
import { toPetResponse, toPetResponseArray } from "../helpers/pet-mapper.js";
import {
  findAllPetsByOwner,
  findPetByIdAndOwner,
  createPet,
  updatePetById,
  deletePetById,
} from "../repositories/pet.repository.js";
import { HttpError } from "../utils/http-error.js";

export const getAllPets = async (userId: string) => {
  const pets = await findAllPetsByOwner(userId);
  const mappedPets = toPetResponseArray(pets);

  return mappedPets;
};

export const getPetById = async (userId: string, petId: string) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const mappedPet = toPetResponse(pet);
  return mappedPet;
};

export const createPetService = async (
  userId: string,
  payload: CreatePetRequest
) => {
  const dataWithOwner = { ...payload, owner: userId };
  await createPet(dataWithOwner);
};

export const updatePetService = async (
  userId: string,
  petId: string,
  payload: CreatePetRequest
) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  await updatePetById(petId, payload);
};

export const deletePetService = async (userId: string, petId: string) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  await deletePetById(petId);
};
