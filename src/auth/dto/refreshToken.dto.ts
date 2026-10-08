import z from 'zod';

export const RefreshTokenDtoSchema = z.object({
  refreshToken: z.string(),
});
export type RefreshTokenAuthDto = z.infer<typeof RefreshTokenDtoSchema>;
