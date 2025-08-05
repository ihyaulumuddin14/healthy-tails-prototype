import { Request, Response, NextFunction } from "express";
import { VisitHistoryResponse } from "../domain/dto/visit-history.dto.js";
import {
  createVisitHistoryForPetService,
  getVisitHistoriesForPet,
} from "../services/visit-history.service.js";

export const findAllHistoriesForPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const histories: VisitHistoryResponse[] = await getVisitHistoriesForPet(
      req.user!.id,
      req.params.id
    );
    return res
      .status(200)
      .json({ message: "Histories retrieved successfully", histories });
  } catch (err) {
    next(err);
  }
};

export const createVisitHistoryForPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const history: VisitHistoryResponse = await createVisitHistoryForPetService(
      req.user!.id,
      req.params.id,
      req.body
    );
    return res
      .status(201)
      .json({ message: "Visit history created successfully", history });
  } catch (err) {
    next(err);
  }
};
