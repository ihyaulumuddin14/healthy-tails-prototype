import { NextFunction, Request, Response } from "express";

import { NewsResponse } from "../domain/dto/news.dto.js";

import {
  createNewsService,
  deleteNewsService,
  getAllNews,
  getNewsById,
  updateNewsService,
} from "../services/news.service.js";

export const findAllNews = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const news: NewsResponse[] = await getAllNews();
    return res.status(200).json({ message: "News retrieved successfully", news });
  } catch (err) {
    next(err);
  }
};

export const findNewsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news: NewsResponse = await getNewsById(req.params.id);
    return res.status(200).json({ message: "News retrieved successfully", news });
  } catch (err) {
    next(err);
  }
};

export const createNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news: NewsResponse = await createNewsService(req.body);
    return res.status(201).json({ message: "News created successfully", news });
  } catch (err) {
    next(err);
  }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news: NewsResponse = await updateNewsService(req.params.id, req.body);
    return res.status(200).json({ message: "News updated successfully", news });
  } catch (err) {
    next(err);
  }
};

export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteNewsService(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
