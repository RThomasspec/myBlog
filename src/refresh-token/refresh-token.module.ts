import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schema/refreshToken.schema';
import { RefreshTokenRepository } from './refresh-token.repository/refresh-token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
  providers: [RefreshTokenRepository],
  exports: [RefreshTokenRepository],
})
export class RefreshTokenModule {}
