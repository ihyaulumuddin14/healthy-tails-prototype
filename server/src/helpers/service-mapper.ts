import { ServiceResponse } from "../domain/dto/service.dto.js";
import { ServiceItf } from "../domain/entity/service.entity.js";

export const toServiceResponse = (services: ServiceItf): ServiceResponse => {
  return {
    _id: services._id.toString(),
    ...services.toObject(),
  };
};

export const toServiceResponseArray = (servicesArray: ServiceItf[]): ServiceResponse[] => {
  return servicesArray.map(toServiceResponse);
};
