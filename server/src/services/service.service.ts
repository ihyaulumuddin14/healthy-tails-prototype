import { CreateServiceRequest, ServiceResponse, UpdateServiceRequest } from "../domain/dto/service.dto.js";

import { toServiceResponse, toServiceResponseArray } from "../helpers/service-mapper.js";

import {
  findAllServices,
  findServiceByName,
  insertService,
  updateServiceById,
} from "../repositories/service.repository.js";

import { HttpError } from "../utils/http-error.js";
import { deleteCache, getCache, setCache } from "../utils/redis.js";

export const getAllServices = async () => {
  const cacheKey = "services:all";

  const cachedServices = await getCache<ServiceResponse>(cacheKey);
  if (cachedServices && Array.isArray(cachedServices)) {
    return cachedServices;
  }

  const services = await findAllServices();
  const mappedServices = toServiceResponseArray(services);

  await setCache(cacheKey, mappedServices, 3600);

  return mappedServices;
};

export const addService = async (payload: CreateServiceRequest) => {
  const existingService = await findServiceByName(payload.name);
  if (existingService) {
    throw new HttpError(409, "Service with this name already exists");
  }

  const service = await insertService(payload);
  await deleteCache("services:all");

  const mappedService = toServiceResponse(service);
  return mappedService;
};

export const editService = async (id: string, payload: UpdateServiceRequest) => {
  const service = await updateServiceById(id, payload);
  if (!service) {
    throw new HttpError(404, "Service not found");
  }

  await deleteCache("services:all");
  await deleteCache(`service:${id}`);

  const mappedService = toServiceResponse(service);
  return mappedService;
};
