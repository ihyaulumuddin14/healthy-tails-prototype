import { Request, Response, NextFunction } from "express";
import { getAllNews, getNewsById } from "../services/news.service.js";
import { NewsResponse } from "../domain/dto/news.dto.js";

export const findAllNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news: NewsResponse[] = await getAllNews();
    return res.status(200).json(news);
  } catch (err) {
    next(err);
  }
};

export const findNewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news: NewsResponse = await getNewsById(req.params.id);
    return res.status(200).json(news);
  } catch (err) {
    next(err);
  }
};
