import z from 'zod';

export const LoginAuthDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
  platform: z.enum(['ios', 'android', 'web']),
});
export type LoginAuthDto = z.infer<typeof LoginAuthDtoSchema>;
