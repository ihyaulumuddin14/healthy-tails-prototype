import { CreateVisitHistoryRequest, UpdateVisitHistoryRequest } from "../domain/dto/visit-history.dto.js";

import { toVisitHistoryResponse, toVisitHistoryResponseArray } from "../helpers/visit-history-mapper.js";

import { findActiveBookingForPet, updateBookingById } from "../repositories/booking.repository.js";
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

  const mappedVisitHistory = toVisitHistoryResponse(visitHistory);

  return mappedVisitHistory;
};

export const createVisitHistoryForPetService = async (petId: string, payload: CreateVisitHistoryRequest) => {
  const pet = await findPetById(petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found");
  }

  const dataWithPetAndOwner = { ...payload, pet: petId, owner: pet.owner.toString() };

  const visitHistory = await createVisitHistory(dataWithPetAndOwner);

  const activeBooking = await findActiveBookingForPet(petId, new Date(visitHistory.visitDate));
  if (activeBooking) {
    await updateBookingById(activeBooking._id, {
      status: "COMPLETED",
      visitHistory,
    });
  }

  const mappedVisitHistory = toVisitHistoryResponse(visitHistory);

  return mappedVisitHistory;
};

export const updateHistoryService = async (historyId: string, payload: UpdateVisitHistoryRequest) => {
  const updatedHistory = await updateHistoryById(historyId, payload);
  if (!updatedHistory) {
    throw new HttpError(404, "Visit history not found");
  }
  const mappedVisitHistory = toVisitHistoryResponse(updatedHistory);

  return mappedVisitHistory;
};

export const deleteVisitHistoryService = async (historyId: string) => {
  const deletedHistory = await deleteHistoryById(historyId);
  if (!deletedHistory) {
    throw new HttpError(404, "Visit history not found");
  }
};
