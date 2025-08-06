import { CreateVisitHistoryRequest } from "../domain/dto/visit-history.dto.js";

import { toVisitHistoryResponseArray, tovisitHistoryResponse } from "../helpers/visit-history-mapper.js";

import { findPetById, findPetByIdAndOwner } from "../repositories/pet.repository.js";
import { createVisitHistory, findAllHistoriesByPetId } from "../repositories/visit-history.repository.js";

import { HttpError } from "../utils/http-error.js";

export const getVisitHistoriesForPet = async (userId: string, petId: string) => {
  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const histories = await findAllHistoriesByPetId(petId);
  const mappedVisitHistories = toVisitHistoryResponseArray(histories);

  return mappedVisitHistories;
};

export const createVisitHistoryForPetService = async (petId: string, payload: CreateVisitHistoryRequest) => {
  const pet = await findPetById(petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found");
  }

  const dataWithPetAndOwner = { ...payload, pet: petId, owner: pet.owner._id.toString() };

  const visitHistory = await createVisitHistory(dataWithPetAndOwner);

  const populatedHistory = await visitHistory.populate([
    { path: "pet", model: "Pet" },
    { path: "owner", model: "User" },
  ]);

  const mappedVisitHistory = tovisitHistoryResponse(populatedHistory);

  return mappedVisitHistory;
};
