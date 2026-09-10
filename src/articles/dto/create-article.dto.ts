import { ApiProperty } from '@nestjs/swagger';
import z from 'zod';

export const createArticleSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});
