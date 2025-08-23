import { z } from "zod";

export const CreatePetSchema = z.object({
   name: z.string().min(5, "Name must be at least 5 characters long").max(50, "Name must be at most 50 characters long"),
   type: z.enum(["Dog", "Cat"], { error: "Type must be either Dog or Cat" }),
   race: z.string().min(1, "Race is required").max(50, "Race must be at most 50 characters long"),
   color: z.string().min(1, "Color is required").max(50, "Color must be at most 50 characters long"),
   birthDate: z.date().optional(),
   age: z.number().min(0, "Age must be a positive number").max(30, "Age must be at most 30 years"),
   gender: z.enum(["Male", "Female"], {
      error: "Gender must be either Male or Female",
   }),
});

export const EditPetSchema = CreatePetSchema.partial()

export const DisableBookingUISchema = z.object({
   name: z.string().min(5, 'Name must be at least 5 characters long'),
   email: z.string().email('Invalid email format'),
   petName: z.string().min(1, 'Pet name is required'),
   type: z.enum(['Cat', 'Dog'], 'Pet type is required'),
   race: z.string().min(1, 'Pet race is required'),
   age: z.number().min(0.01, 'Pet age is required'),
   gender: z.enum(['Male', 'Female'], 'Pet gender is required'),
})

export const BookingSchema = z.object({
   petId: z.string('Pet is required'),
   serviceId: z.string('Service is required'),
   bookingDate: z.date('Date is required'),
   notes: z.string().max(500).optional(),
})

export type DisableBookingUICredentials = z.infer<typeof DisableBookingUISchema>
export type CreatePetCredentials = z.infer<typeof CreatePetSchema>
export type EditPetCredentials = z.infer<typeof EditPetSchema>
export type BookingCredentials = z.infer<typeof BookingSchema>