import { CreateVisitHistoryRequest, UpdateVisitHistoryRequest } from "../domain/dto/visit-history.dto.js";

import { toVisitHistoryResponseArray, tovisitHistoryResponse } from "../helpers/visit-history-mapper.js";

import { findPetById, findPetByIdAndOwner } from "../repositories/pet.repository.js";
import {
  createVisitHistory,
  deleteHistoryById,
  findAllHistoriesByPetId,
  findHistoryById,
  updateHistoryById,
} from "../repositories/visit-history.repository.js";

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

export const getVisitHistoryByIdForUser = async (userId: string, historyId: string) => {
  const visitHistory = await findHistoryById(historyId);
  if (!visitHistory || visitHistory.owner.toString() !== userId) {
    throw new HttpError(404, "Visit history not found or you do not have access");
  }

  const mappedVisitHistory = tovisitHistoryResponse(visitHistory);

  return mappedVisitHistory;
};

export const createVisitHistoryForPetService = async (petId: string, payload: CreateVisitHistoryRequest) => {
  const pet = await findPetById(petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found");
  }

  const dataWithPetAndOwner = { ...payload, pet: petId, owner: pet.owner._id.toString() };

  const visitHistory = await createVisitHistory(dataWithPetAndOwner);

  const mappedVisitHistory = tovisitHistoryResponse(visitHistory);

  return mappedVisitHistory;
};

export const updateHistoryService = async (historyId: string, payload: UpdateVisitHistoryRequest) => {
  const updatedHistory = await updateHistoryById(historyId, payload);
  if (!updatedHistory) {
    throw new HttpError(404, "Visit history not found");
  }
  const mappedVisitHistory = tovisitHistoryResponse(updatedHistory);

  return mappedVisitHistory;
};

export const deleteVisitHistoryService = async (historyId: string) => {
  const deletedHistory = await deleteHistoryById(historyId);
  if (!deletedHistory) {
    throw new HttpError(404, "Visit history not found");
  }
};
