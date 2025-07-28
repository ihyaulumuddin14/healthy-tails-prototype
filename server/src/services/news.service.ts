import { NewsResponse } from "../domain/dto/news.dto.js";
import { findAllNews, findNewsById } from "../repositories/news.repository.js";
import { HttpError } from "../utils/http-error.js";
import { getCache, setCache } from "../utils/redis.js";
import { toNewResponseArray, toNewsResponse } from "../helpers/news-mapper.js";

export const getAllNews = async () => {
  const cacheKey = "news:all";

  const cachedNews = await getCache<NewsResponse>(cacheKey);
  if (cachedNews && Array.isArray(cachedNews)) {
    return cachedNews;
  }

  const news = await findAllNews();
  const mappedNews = toNewResponseArray(news);

  await setCache(cacheKey, news, 3600);

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

  await setCache(cacheKey, news, 3600);

  return mappedNews;
};
