import { NextFunction, Request, Response } from "express";

import { ServiceResponse } from "../domain/dto/service.dto.js";

import { addService, editService, getAllServices } from "../services/service.service.js";

export const findAllServices = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const services: ServiceResponse[] = await getAllServices();
    return res.status(200).json({ message: "Services retrieved successfully", services });
  } catch (err) {
    next(err);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service: ServiceResponse = await addService(req.body);
    return res.status(201).json({ message: "Service created successfully", service });
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service: ServiceResponse = await editService(req.params.id, req.body);
    return res.status(200).json({ message: "Service updated successfully", service });
  } catch (err) {
    next(err);
  }
};
