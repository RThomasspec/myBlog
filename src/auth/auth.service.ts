import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import type { UpdateRegisterDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/users/user.repository';
import * as argon2 from 'argon2';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository/refresh-token.repository';
import { RefreshTokenData } from 'src/types/refreshToken';
import { RefreshTokenAuthDto } from './dto/refreshToken.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  async create(registerAuthDto: RegisterAuthDto) {
    const user = await this.userRepository.findByEmail(registerAuthDto.email);

    const hashedPassword = await argon2.hash(registerAuthDto.password);
    if (user) {
      throw new HttpException('Email déjà existant ! ', HttpStatus.CONFLICT);
    }

    return this.userRepository.createUser(
      registerAuthDto.name,
      registerAuthDto.email,
      hashedPassword,
    );
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findByEmail(loginAuthDto.email);

    if (!user) {
      throw new HttpException('Email incorrect', HttpStatus.UNAUTHORIZED);
    }

    const passwordValid = await argon2.verify(
      user.hashedPassword,
      loginAuthDto.password,
    );

    if (!passwordValid) {
      throw new HttpException(
        'Mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // ajout date expiration et date démission
    const accessToken = this.jwtService.sign({
      sub: user.id,
      type: 'access',
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const jti = randomUUID();
    // ajout date expiration et date démission
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        type: 'refresh',
        jti,
      },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: '30d',
      },
    );

    const tokenHash = await argon2.hash(refreshToken);
    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 30);
    const createdAt = new Date();

    const data: RefreshTokenData = {
      userId: user.id,
      jti,
      plateforme: loginAuthDto.platform,
      tokenHash,
      createdAt,
      expiresAt,
      revokedAt: null,
    };

    await this.refreshTokenRepository.Create(data);

    return { accessToken, refreshToken, message: 'Connexion réussie' };
  }

  async refresh(refreshTokenAuthDto: RefreshTokenAuthDto) {
    let payload: {
      sub: string;
      type: string;
      jti: string;
    };

    try {
      payload = this.jwtService.verify(refreshTokenAuthDto.refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new HttpException(
        'Refresh token invalide ou expiré',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (payload.type !== 'refresh') {
      throw new HttpException(
        "Le token fourni n'est pas un refresh token",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const refreshToken = await this.refreshTokenRepository.findByJti(
      payload.jti,
    );

    if (!refreshToken) {
      throw new HttpException('Refresh token inconnu', HttpStatus.UNAUTHORIZED);
    }

    if (refreshToken.revokedAt !== null) {
      throw new HttpException(
        'Le refresh token est révoqué',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (refreshToken.expiresAt <= new Date()) {
      throw new HttpException(
        'Le refresh token est expiré',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValid = await argon2.verify(
      refreshToken.tokenHash,
      refreshTokenAuthDto.refreshToken,
    );

    if (!isValid) {
      throw new HttpException(
        'Refresh token invalide',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.jwtService.sign({
      sub: refreshToken.userId,
      type: 'access',
    });

    return {
      accessToken,
    };
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
