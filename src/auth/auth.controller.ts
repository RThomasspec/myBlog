import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UnauthorizedException,
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
import { HttpAdapterHost } from '@nestjs/core';
import { RefreshTokenData } from 'src/types/refreshToken';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  @Post('register')
  create(
    @Body({ schema: CreateRegisterAuthDtoSchema })
    registerAuthDto: RegisterAuthDto,
  ) {
    return this.authService.create(registerAuthDto);
  }

  @Post('login')
  async login(
    @Body({ schema: LoginAuthDtoSchema })
    loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginAuthDto);

    res.cookie('refreshToken', refreshToken);

    return accessToken;
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh token manquant');
    }

    const { accessToken, newRefreshToken } =
      await this.authService.refresh(oldRefreshToken);

    res.cookie('refreshToken', newRefreshToken);
    return { accessToken };
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
