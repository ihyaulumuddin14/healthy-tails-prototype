import z from "zod";

export const vaccineEnum = [
   "FeLV",
   "Panleucopenia",
   "Rhinotracheitis",
   "Calicivirus",
   "Chlamydia",
   "Rabies",
   "Distemper",
   "Parvo",
   "Leptospirosis",
   "Parainfluenza",
   "Hepatitis",
   "Bordetella",
 ] as const;

export const HistorySchema = z.object({
   visitDate: z.coerce.date("Visit date is required"),
   nextVisitDate: z.coerce.date().optional(),
   bodyWeight: z.number("Body weight is required").min(0, "Body weight must be a positive number"),
   temperature: z.number("Temperature is required").min(0, "Temperature must be a positive number"),
   symptoms: z.string().min(1, "Symptoms are required").max(500, "Symptoms must be at most 500 characters long"),
   diagnosis: z.string().max(500, "Diagnosis must be at most 500 characters long").optional(),
   treatments: z.string().max(500, "Treatments must be at most 500 characters long").optional(),
   vaccinesGiven: z.array(z.enum(vaccineEnum)).optional(),
   injectionSite: z.string().max(100, "Injection site must be at most 100 characters long").optional(),
   notes: z.string().max(1000, "Notes must be at most 1000 characters long").optional(),
 });

export type HistoryCredentials = z.infer<typeof HistorySchema>