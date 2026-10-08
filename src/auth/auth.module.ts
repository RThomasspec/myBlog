import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),

    UserModule,
    RefreshTokenModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard],
  exports: [AccessTokenGuard, JwtModule],
})
export class AuthModule {}
