import { CreateNewsRequest, NewsResponse, UpdateNewsRequest } from "../domain/dto/news.dto.js";

import { toNewResponseArray, toNewsResponse } from "../helpers/news-mapper.js";

import { createNews, deleteNews, findAllNews, findNewsById, updateNewsById } from "../repositories/news.repository.js";

import { HttpError } from "../utils/http-error.js";
import { deleteCache, getCache, setCache } from "../utils/redis.js";

export const getAllNews = async () => {
  const cacheKey = "news:all";

  const cachedNews = await getCache<NewsResponse>(cacheKey);
  if (cachedNews && Array.isArray(cachedNews)) {
    return cachedNews;
  }

  const news = await findAllNews();
  const mappedNews = toNewResponseArray(news);

  await setCache(cacheKey, mappedNews, 3600);

  return mappedNews;
};

export const getNewsById = async (id: string) => {
  const cacheKey = `news:${id}`;

  const cachedNews = await getCache<NewsResponse>(cacheKey);
  if (cachedNews) {
    return cachedNews;
  }

  const news = await findNewsById(id);
  if (!news) {
    throw new HttpError(404, "News not found");
  }

  const mappedNews = toNewsResponse(news);

  await setCache(cacheKey, mappedNews, 3600);

  return mappedNews;
};

export const createNewsService = async (payload: CreateNewsRequest) => {
  const news = await createNews(payload);
  await deleteCache("news:all");

  const mappedNews = toNewsResponse(news);
  return mappedNews;
};

export const updateNewsService = async (id: string, payload: UpdateNewsRequest) => {
  const news = await updateNewsById(id, payload);
  if (!news) {
    throw new HttpError(404, "News not found");
  }

  await deleteCache("news:all");
  await deleteCache(`news:${id}`);

  const mappedNews = toNewsResponse(news);
  return mappedNews;
};

export const deleteNewsService = async (id: string) => {
  const deletedNews = await deleteNews(id);
  if (!deletedNews) {
    throw new HttpError(404, "News not found");
  }

  await deleteCache("news:all");
  await deleteCache(`news:${id}`);
};
