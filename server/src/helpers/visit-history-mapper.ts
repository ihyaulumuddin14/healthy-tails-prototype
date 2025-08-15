import { VisitHistoryItf } from "../domain/entity/visit-history.entity.js";

import { toNestedPetResponse } from "./pet-mapper.js";
import { toUserResponse } from "./user-mapper.js";

export const toVisitHistoryResponse = (history: VisitHistoryItf) => {
  return {
    ...history.toObject(),
    _id: history._id.toString(),
    visitDate: history.visitDate.toISOString(),
    nextVisitDate: history.nextVisitDate?.toISOString(),
    pet: toNestedPetResponse(history.pet),
    owner: toUserResponse(history.owner),
    createdAt: history.createdAt.toISOString(),
    updatedAt: history.updatedAt.toISOString(),
  };
};

export const toVisitHistoryResponseArray = (visitHistoryArray: VisitHistoryItf[]) => {
  return visitHistoryArray.map(toVisitHistoryResponse);
};
