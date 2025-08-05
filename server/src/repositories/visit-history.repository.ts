import { VisitHistoryCreationData } from "../domain/dto/visit-history.dto.js";
import VisitHistoryModel, { VisitHistoryItf } from "../domain/entity/visit-history.js";

export const findAllHistoriesByPetId = async (petId: string): Promise<VisitHistoryItf[]> => {
  return VisitHistoryModel.find({ pet: petId }).exec();
};

export const createVisitHistory = async (data: VisitHistoryCreationData): Promise<VisitHistoryItf> => {
  const visitHistory = new VisitHistoryModel(data);
  return visitHistory.save();
};
