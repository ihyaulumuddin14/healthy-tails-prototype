import { z } from "zod";

import { MongoIdString } from "./common.dto.js";
import { UserResponseSchema } from "./user.dto.js";

export const CreatePetRequestSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").max(50, "Name must be at most 50 characters long"),
  type: z.enum(["Dog", "Cat"], { error: "Type must be either Dog or Cat" }),
  race: z.string().min(1, "Race is required").max(50, "Race must be at most 50 characters long"),
  color: z.string().min(1, "Color is required").max(50, "Color must be at most 50 characters long"),
  birthDate: z.coerce.date().optional(),
  age: z.number().min(0, "Age must be a positive number").max(30, "Age must be at most 30 years"),
  gender: z.enum(["Male", "Female"], {
    error: "Gender must be either Male or Female",
  }),
});

export const UpdatePetRequestSchema = CreatePetRequestSchema.partial();

export const PetResponseSchema = z.object({
  _id: MongoIdString,
  name: z.string(),
  type: z.enum(["Dog", "Cat"]),
  race: z.string(),
  color: z.string(),
  birthDate: z.iso.datetime().optional(),
  age: z.number(),
  gender: z.enum(["Male", "Female"]),
  owner: UserResponseSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const NestedPetResponseSchema = PetResponseSchema.omit({ owner: true });

export type CreatePetRequest = z.infer<typeof CreatePetRequestSchema>;
export type UpdatePetRequest = z.infer<typeof UpdatePetRequestSchema>;
export type PetResponse = z.infer<typeof PetResponseSchema>;
export type NestedPetResponse = z.infer<typeof NestedPetResponseSchema>;
export type PetCreationData = CreatePetRequest & { owner: string };
