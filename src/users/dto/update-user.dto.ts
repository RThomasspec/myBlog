import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, createUserSchema } from './create-user.dto';
import z from 'zod';

export const updateArticleSchema = createUserSchema.partial();

export type UpdateUserDto = z.infer<typeof updateArticleSchema>;
