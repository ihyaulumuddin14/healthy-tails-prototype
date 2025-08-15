import { z } from "zod";

import { vaccineEnum } from "../entity/visit-history.entity.js";
import { MongoIdString } from "./common.dto.js";
import { NestedPetResponseSchema } from "./pet.dto.js";
import { UserResponseSchema } from "./user.dto.js";

export const CreateVisitHistoryRequestSchema = z.object({
  visitDate: z.coerce.date().optional(),
  nextVisitDate: z.coerce.date().optional(),
  bodyWeight: z.number().min(0, "Body weight must be a positive number"),
  temperature: z.number().min(0, "Temperature must be a positive number"),
  symptoms: z.string().min(1, "Symptoms are required").max(500, "Symptoms must be at most 500 characters long"),
  diagnosis: z.string().max(500, "Diagnosis must be at most 500 characters long").optional(),
  treatments: z.string().max(500, "Treatments must be at most 500 characters long").optional(),
  vaccinesGiven: z.array(z.enum(vaccineEnum)).optional(),
  injectionSite: z.string().max(100, "Injection site must be at most 100 characters long").optional(),
  notes: z.string().max(1000, "Notes must be at most 1000 characters long").optional(),
});

export const UpdateVisitHistoryRequestSchema = CreateVisitHistoryRequestSchema.partial();

export const VisitHistoryResponseSchema = z.object({
  _id: MongoIdString,
  visitDate: z.iso.datetime(),
  nextVisitDate: z.iso.datetime().optional(),
  bodyWeight: z.number(),
  temperature: z.number(),
  symptoms: z.string(),
  diagnosis: z.string().optional(),
  treatments: z.string().optional(),
  vaccinesGiven: z.array(z.enum(vaccineEnum)).optional(),
  injectionSite: z.string().optional(),
  notes: z.string().optional(),
  pet: NestedPetResponseSchema,
  owner: UserResponseSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type CreateVisitHistoryRequest = z.infer<typeof CreateVisitHistoryRequestSchema>;
export type UpdateVisitHistoryRequest = z.infer<typeof UpdateVisitHistoryRequestSchema>;
export type VisitHistoryResponse = z.infer<typeof VisitHistoryResponseSchema>;
export type VisitHistoryCreationData = CreateVisitHistoryRequest & {
  pet: string;
  owner: string;
};
