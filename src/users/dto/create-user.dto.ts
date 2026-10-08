import { z } from 'zod';
import * as argon2 from 'argon2';

export const createUserSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(1),
  password: z
    .string()
    .min(8, 'Au moins 8 caractères')
    .transform((pw) => argon2.hash(pw)),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
