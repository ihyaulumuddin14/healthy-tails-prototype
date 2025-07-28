import NewsModel, { NewsItf } from "../domain/entity/news.entity.js";

export const findAllNews = async (): Promise<NewsItf[]> => {
  return NewsModel.find().exec();
};

export const findNewsById = async (id: string): Promise<NewsItf | null> => {
  return NewsModel.findById(id).exec();
};
