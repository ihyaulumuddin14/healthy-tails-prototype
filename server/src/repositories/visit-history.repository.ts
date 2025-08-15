import { UpdateVisitHistoryRequest, VisitHistoryCreationData } from "../domain/dto/visit-history.dto.js";
import VisitHistoryModel, { VisitHistoryItf } from "../domain/entity/visit-history.entity.js";

export const findAllHistoriesByPetId = async (petId: string): Promise<VisitHistoryItf[]> => {
  return VisitHistoryModel.find({ pet: petId }).populate(["pet", "owner"]).sort({ visitDate: -1 }).exec();
};

export const findHistoryById = async (historyId: string): Promise<VisitHistoryItf | null> => {
  return VisitHistoryModel.findById(historyId).populate(["pet", "owner"]).exec();
};

export const createVisitHistory = async (data: VisitHistoryCreationData): Promise<VisitHistoryItf> => {
  const visitHistory = new VisitHistoryModel(data);
  await visitHistory.save();
  return visitHistory.populate(["pet", "owner"]);
};

export const updateHistoryById = async (
  historyId: string,
  data: UpdateVisitHistoryRequest
): Promise<VisitHistoryItf | null> => {
  return VisitHistoryModel.findByIdAndUpdate(historyId, data, { new: true }).populate(["pet", "owner"]).exec();
};

export const deleteHistoryById = async (historyId: string): Promise<VisitHistoryItf | null> => {
  return VisitHistoryModel.findByIdAndDelete(historyId).populate(["pet", "owner"]).exec();
};
