import NewsModel, { NewsItf } from "../domain/entity/news.entity.js";

export const findAllNews = async (): Promise<NewsItf[]> => {
  return NewsModel.find().exec();
};

export const findNewsById = async (id: string): Promise<NewsItf | null> => {
  return NewsModel.findById(id).exec();
};

export const createNews = async (data: Partial<NewsItf>): Promise<NewsItf> => {
  const news = new NewsModel(data);
  return news.save();
};

export const updateNewsById = async (id: string, updateData: Partial<NewsItf>): Promise<NewsItf | null> => {
  return NewsModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

export const deleteNews = async (id: string): Promise<NewsItf | null> => {
  return NewsModel.findByIdAndDelete(id).exec();
};
