import {
  createVisitHistory,
  findAllHistoriesByPetId,
} from "../repositories/visit-history.repository.js";
import {
  tovisitHistoryResponse,
  toVisitHistoryResponseArray,
} from "../helpers/visit-history-mapper.js";
import { CreateVisitHistoryRequest } from "../domain/dto/visit-history.dto.js";
import { HttpError } from "../utils/http-error.js";
import { findPetByIdAndOwner } from "../repositories/pet.repository.js";

export const getVisitHistoriesForPet = async (
  userId: string,
  petId: string
) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const histories = await findAllHistoriesByPetId(petId);
  const mappedVisitHistories = toVisitHistoryResponseArray(histories);

  return mappedVisitHistories;
};

export const createVisitHistoryForPetService = async (
  userId: string,
  petId: string,
  payload: CreateVisitHistoryRequest
) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const dataWithPetAndOwner = { ...payload, pet: petId, owner: userId };
  const visitHistory = await createVisitHistory(dataWithPetAndOwner);
  const populatedHistory = await visitHistory.populate("pet owner");
  const mappedVisitHistory = tovisitHistoryResponse(populatedHistory);

  return mappedVisitHistory;
};
