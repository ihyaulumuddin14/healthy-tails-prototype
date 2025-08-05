import { z } from "zod";
import mongoose from "mongoose";
import { vaccineEnum } from "../entity/visit-history.js";

const MongoIdString = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ID format",
  });

export const VisitHistoryIdParamSchema = z.object({
  id: MongoIdString,
});

export const CreateVisitHistorySchema = z.object({
  visitDate: z.iso.datetime().optional(),
  nextVisitDate: z.date().optional(),
  bodyWeight: z.number().min(0, "Body weight must be a positive number"),
  temperature: z.number().min(0, "Temperature must be a positive number"),
  symptoms: z
    .string()
    .min(1, "Symptoms are required")
    .max(500, "Symptoms must be at most 500 characters long"),
  diagnosis: z
    .string()
    .min(1, "Diagnosis is required")
    .max(500, "Diagnosis must be at most 500 characters long")
    .optional(),
  treatments: z
    .string()
    .min(1, "Treatments are required")
    .max(500, "Treatments must be at most 500 characters long")
    .optional(),
  vaccinesGiven: z.array(z.enum(vaccineEnum)).optional(),
  injectionSite: z
    .string()
    .max(100, "Injection site must be at most 100 characters long")
    .optional(),
  notes: z
    .string()
    .max(500, "Notes must be at most 1000 characters long")
    .optional(),
});

export const VisitHistoryResponseSchema = z.object({
  _id: MongoIdString,
  visitDate: z.date(),
  nextVisitDate: z.date().optional(),
  bodyWeight: z.number(),
  temperature: z.number(),
  symptoms: z.string(),
  diagnosis: z.string().optional(),
  treatments: z.string().optional(),
  vaccinesGiven: z.array(z.enum(vaccineEnum)).optional(),
  injectionSite: z.string().optional(),
  notes: z.string().optional(),
  pet: MongoIdString,
  owner: MongoIdString,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type CreateVisitHistoryRequest = z.infer<
  typeof CreateVisitHistorySchema
>;
export type VisitHistoryResponse = z.infer<typeof VisitHistoryResponseSchema>;
export type VisitHistoryCreationData = CreateVisitHistoryRequest & {
  pet: string;
  owner: string;
};
