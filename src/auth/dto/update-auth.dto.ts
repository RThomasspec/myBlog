import { PartialType } from '@nestjs/swagger';
import { CreateRegisterAuthDtoSchema } from './register-auth.dto';
import z from 'zod';

export const UpdateRegisterAuthDtoSchema =
  CreateRegisterAuthDtoSchema.partial();

export type UpdateRegisterDto = z.infer<typeof UpdateRegisterAuthDtoSchema>;
