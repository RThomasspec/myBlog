import z from 'zod';

export const CreateRegisterAuthDtoSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(1),
  password: z.string().min(8),
});
export type RegisterAuthDto = z.infer<typeof CreateRegisterAuthDtoSchema>;
