import { AccessTokenPayload } from './access-token-payload';

declare global {
  namespace Express {
    interface Request {
      user: AccessTokenPayload;
    }
  }
}
