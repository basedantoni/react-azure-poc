import { z } from 'zod';

export const step1Schema = z.object({
  lastName: z.string().min(1),
  EIN: z.string().min(10),
  park: z.enum(['Carowinds', 'Six Flags', 'Fiesta Texas']),
});

export const step2Schema = z.object({
  name: z.string().min(1),
  jobNumber: z.string().min(1),
  location: z.string().min(1),
  employeeTickets: z.number().min(0),
  guestTickets: z.number().max(1).min(0),
  childrenTickets: z.number().min(0),
});

export const step3Schema = z.object({
  fullTicketQuantity: z.number().min(0).max(10),
  mealTicketQuantity: z.number().min(0).max(10),
});

export const step4Schema = z.object({
  email: z.string().email().optional(),
});

export const FormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema.partial())
  .merge(step4Schema);
export type FormValues = z.infer<typeof FormSchema>;
