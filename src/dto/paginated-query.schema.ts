import { z } from 'zod';

export const paginatedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['ASC', 'DESC']).default('DESC'),
});
