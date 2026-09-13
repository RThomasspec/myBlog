import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(10),
  age: z.number().max(120),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
