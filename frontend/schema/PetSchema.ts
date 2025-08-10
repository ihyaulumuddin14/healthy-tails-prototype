import { date, z } from "zod";

export const PetSchema = z.object({
   name: z.string().min(1, 'Pet name is required'),
   type: z.enum(['Cat', 'Dog'], 'Pet type is required'),
   race: z.string().min(1, 'Pet race is required'),
   color: z.string().min(1, 'Pet color is required'),
   birthDate: z.date().min(new Date('1900-01-01'), 'Pet birth date is required'),
   age: z.number().min(0.01, 'Pet age is required'),
   gender: z.enum(['Male', 'Female'], 'Pet gender is required'),
   owner: z.string().min(1, 'Pet owner is required'),
})

export const AppointmentSchema = z.object({
   email: z.string().email('Invalid email format'),
   phone: z.string().min(9, 'Phone number is required'),
   name: z.string().min(1, 'Pet name is required'),
   type: z.enum(['Cat', 'Dog'], 'Pet type is required'),
   race: z.string().min(1, 'Pet race is required'),
   age: z.number().min(0.01, 'Pet age is required'),
   gender: z.enum(['Male', 'Female'], 'Pet gender is required'),
   service: z.enum(['Physical Exam', 'Vaccination', 'Ward Unit', 'Surgery / Sterilization', 'Therapeutic Diet', 'Other'], 'Service is required'),
   date: z.date().min(Date.now(), 'Date is required'),
})

export type PetCredentials = z.infer<typeof PetSchema>
export type AppointmentCredentials = z.infer<typeof AppointmentSchema>