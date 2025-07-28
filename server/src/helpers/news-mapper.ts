import { NewsResponse } from "../domain/dto/news.dto.js";
import { NewsItf } from "../domain/entity/news.entity.js";

export const toNewsResponse = (news: NewsItf): NewsResponse => {
  return {
    _id: news._id.toString(),
    ...news.toObject(),
    createdAt: news.createdAt.toISOString(),
    updatedAt: news.updatedAt.toISOString(),
  };
};

export const toNewResponseArray = (newsArray: NewsItf[]): NewsResponse[] => {
  return newsArray.map(toNewsResponse);
};
