export interface RefreshTokenData {
  userId: string;
  jti: string;
  lastUsedAt: Date;
  platform: string;
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
}
