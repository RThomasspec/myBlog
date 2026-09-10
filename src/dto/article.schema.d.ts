import { z } from 'zod';
export declare const paginatedQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type PaginatedQueryDto = z.infer<typeof paginatedQuerySchema>;
