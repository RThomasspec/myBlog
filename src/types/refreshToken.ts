export interface RefreshTokenData {
  userId: string;
  jti: string;
  plateforme: string;
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
}
