import { Injectable } from '@nestjs/common';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../schema/refreshToken.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenData } from 'src/types/refreshToken';

@Injectable()
export class RefreshTokenRepository {
  @InjectModel(RefreshToken.name) private model: Model<RefreshTokenDocument>;

  async Create(data: RefreshTokenData) {
    return this.model.create({
      userId: data.userId,
      jti: data.jti,
      platform: data.plateforme,
      tokenHash: data.tokenHash,
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      revokedAt: data.revokedAt,
    });
  }

  async findByJti(jti: string) {
    return this.model.findOne({ jti }).exec();
  }
}
