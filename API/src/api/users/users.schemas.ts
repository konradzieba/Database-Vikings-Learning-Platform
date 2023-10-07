import z from 'zod';
import { registerSchema } from '../auth/auth.schemas';


// to consider
export const updateUserSchema = registerSchema
  .omit({
    indexNumber: true,
    isAdmin: true,
    email: true,
  })
  .partial();


export type UpdateUserInput = z.infer<typeof updateUserSchema>;
