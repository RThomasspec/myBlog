import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateRegisterAuthDtoSchema,
  type RegisterAuthDto,
} from './dto/register-auth.dto';
import type { UpdateRegisterDto } from './dto/update-auth.dto';
import { LoginAuthDtoSchema, type LoginAuthDto } from './dto/login-auth.dto';
import type { RefreshTokenAuthDto } from './dto/refreshToken.dto';
import { RefreshTokenDtoSchema } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(
    @Body({ schema: CreateRegisterAuthDtoSchema })
    registerAuthDto: RegisterAuthDto,
  ) {
    return this.authService.create(registerAuthDto);
  }

  @Post('login')
  login(
    @Body({ schema: LoginAuthDtoSchema })
    loginAuthDto: LoginAuthDto,
  ) {
    return this.authService.login(loginAuthDto);
  }

  @Post('refresh')
  refresh(
    @Body({ schema: RefreshTokenDtoSchema })
    refreshTokenAuthDto: RefreshTokenAuthDto,
  ) {
    return this.authService.refresh(refreshTokenAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.authService.update(+id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
