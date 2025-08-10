import { NextFunction, Request, Response } from "express";

import { VisitHistoryResponse } from "../domain/dto/visit-history.dto.js";

import {
  createVisitHistoryForPetService,
  deleteVisitHistoryService,
  getVisitHistoriesForPet,
  getVisitHistoryByIdForUser,
  updateHistoryService,
} from "../services/visit-history.service.js";

export const findAllHistoriesForPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const histories: VisitHistoryResponse[] = await getVisitHistoriesForPet(req.user!.id, req.params.id);
    return res.status(200).json({ message: "Histories retrieved successfully", histories });
  } catch (err) {
    next(err);
  }
};

export const findVisitHistoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await getVisitHistoryByIdForUser(req.user!.id, req.params.id);
    return res.status(200).json({ message: "Visit history retrieved successfully", history });
  } catch (err) {
    next(err);
  }
};

export const createVisitHistoryForPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history: VisitHistoryResponse = await createVisitHistoryForPetService(req.params.id, req.body);
    return res.status(201).json({ message: "Visit history created successfully", history });
  } catch (err) {
    next(err);
  }
};

export const updateVisitHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history: VisitHistoryResponse = await updateHistoryService(req.params.id, req.body);
    return res.status(200).json({ message: "Visit history updated successfully", history });
  } catch (err) {
    next(err);
  }
};

export const deleteVisitHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteVisitHistoryService(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
