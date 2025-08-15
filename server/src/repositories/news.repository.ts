import { CreateNewsRequest, UpdateNewsRequest } from "../domain/dto/news.dto.js";
import NewsModel, { NewsItf } from "../domain/entity/news.entity.js";

export const findAllNews = async (): Promise<NewsItf[]> => {
  return NewsModel.find().sort({ createdAt: -1 }).exec();
};

export const findNewsById = async (id: string): Promise<NewsItf | null> => {
  return NewsModel.findById(id).exec();
};

export const createNews = async (data: CreateNewsRequest): Promise<NewsItf> => {
  const news = new NewsModel(data);
  return news.save();
};

export const updateNewsById = async (id: string, updateData: UpdateNewsRequest): Promise<NewsItf | null> => {
  return NewsModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

export const deleteNews = async (id: string): Promise<NewsItf | null> => {
  return NewsModel.findByIdAndDelete(id).exec();
};
