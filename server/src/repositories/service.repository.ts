import { CreateServiceRequest, UpdateServiceRequest } from "../domain/dto/service.dto.js";
import ServiceModel, { ServiceItf } from "../domain/entity/service.entity.js";

export const findAllServices = async (): Promise<ServiceItf[]> => {
  return ServiceModel.find({ isActive: true }).exec();
};

export const findServiceById = async (id: string): Promise<ServiceItf | null> => {
  return ServiceModel.findById(id).exec();
};

export const findServiceByName = async (name: string): Promise<ServiceItf | null> => {
  return ServiceModel.findOne({ name }).exec();
};

export const insertService = async (data: CreateServiceRequest): Promise<ServiceItf> => {
  const service = new ServiceModel(data);
  return service.save();
};

export const updateServiceById = async (id: string, updateData: UpdateServiceRequest): Promise<ServiceItf | null> => {
  return ServiceModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};
