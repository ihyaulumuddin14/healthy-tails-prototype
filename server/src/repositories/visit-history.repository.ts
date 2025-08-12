import { VisitHistoryCreationData } from "../domain/dto/visit-history.dto.js";
import VisitHistoryModel, { VisitHistoryItf } from "../domain/entity/visit-history.entity.js";

export const findAllHistoriesByPetId = async (petId: string): Promise<VisitHistoryItf[]> => {
  return VisitHistoryModel.find({ pet: petId }).exec();
};

export const findHistoryById = async (historyId: string): Promise<VisitHistoryItf | null> => {
  return VisitHistoryModel.findById(historyId).exec();
};

export const createVisitHistory = async (data: VisitHistoryCreationData): Promise<VisitHistoryItf> => {
  const visitHistory = new VisitHistoryModel(data);
  return visitHistory.save();
};

export const updateHistoryById = async (
  historyId: string,
  data: Partial<VisitHistoryItf>
): Promise<VisitHistoryItf | null> => {
  return VisitHistoryModel.findByIdAndUpdate(historyId, data, { new: true }).exec();
};

export const deleteHistoryById = async (historyId: string): Promise<VisitHistoryItf | null> => {
  return VisitHistoryModel.findByIdAndDelete(historyId).exec();
};
