import { createArticleSchema } from './create-article.dto';
import { z } from 'zod';

export const updateArticleSchema = createArticleSchema.partial();

export type UpdateArticleDto = z.infer<typeof updateArticleSchema>;
