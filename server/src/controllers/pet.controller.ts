import { Request, Response, NextFunction } from "express";
import { PetResponse } from "../domain/dto/pet.dto.js";
import {
  getAllPets,
  getPetById,
  createPetService,
  updatePetService,
  deletePetService,
} from "../services/pet.service.js";

export const findAllPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pets: PetResponse[] = await getAllPets(req.user!.id);
    return res
      .status(200)
      .json({ message: "Pets retrieved successfully", pets });
  } catch (err) {
    next(err);
  }
};

export const findPetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pet: PetResponse = await getPetById(req.user!.id, req.params.id);
    return res.status(200).json({ message: "Pet retrieved successfully", pet });
  } catch (err) {
    next(err);
  }
};

export const createPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createPetService(req.user!.id, req.body);
    return res.status(201).json({ message: "Pet created successfully" });
  } catch (err) {
    next(err);
  }
};

export const updatePet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updatePetService(req.user!.id, req.params.id, req.body);
    return res.status(200).json({ message: "Pet updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deletePet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deletePetService(req.user!.id, req.params.id);
    return res.status(200).json({ message: "Pet deleted successfully" });
  } catch (err) {
    next(err);
  }
};
