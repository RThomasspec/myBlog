import { z } from 'zod';
import { SortDirection } from '../requests/paginated-query.dto';

export const paginatedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  sortBy: z.string().optional(),
  sortDirection: z
    .enum([SortDirection.ASC, SortDirection.DESC])
    .default(SortDirection.DESC),
});
export type PaginatedQueryData = z.infer<typeof paginatedQuerySchema>;
