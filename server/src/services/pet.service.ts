import { CreatePetRequest, UpdatePetRequest } from "../domain/dto/pet.dto.js";
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
  const pet = await createPet(dataWithOwner);
  const mappedPet = toPetResponse(pet);

  return mappedPet;
};

export const updatePetService = async (
  userId: string,
  petId: string,
  payload: UpdatePetRequest
) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const updatedPet = await updatePetById(petId, payload);
  if (!updatedPet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const mappedUpdatedPet = toPetResponse(updatedPet);
  return mappedUpdatedPet;
};

export const deletePetService = async (userId: string, petId: string) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const deletedPet = await deletePetById(petId);
  if (!deletedPet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }
};
