import { VisitHistoryItf } from "../domain/entity/visit-history.entity.js";

export const tovisitHistoryResponse = (history: VisitHistoryItf) => {
  return {
    _id: history._id.toString(),
    visitDate: history.visitDate,
    nextVisitDate: history.nextVisitDate ? history.nextVisitDate : undefined,
    bodyWeight: history.bodyWeight,
    temperature: history.temperature,
    symptoms: history.symptoms,
    diagnosis: history.diagnosis ? history.diagnosis : undefined,
    treatments: history.treatments ? history.treatments : undefined,
    vaccinesGiven: history.vaccinesGiven || [],
    injectionSite: history.injectionSite ? history.injectionSite : undefined,
    notes: history.notes ? history.notes : undefined,
    pet: history.pet._id.toString(),
    owner: history.owner._id.toString(),
    createdAt: history.createdAt.toISOString(),
    updatedAt: history.updatedAt.toISOString(),
  };
};

export const toVisitHistoryResponseArray = (visitHistoryArray: VisitHistoryItf[]) => {
  return visitHistoryArray.map(tovisitHistoryResponse);
};
