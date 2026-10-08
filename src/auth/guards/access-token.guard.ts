import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Token manquant');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token invalide');
    }

    try {
      const payload = this.jwtService.verify(token);

      if (payload.type !== 'access') {
        throw new UnauthorizedException('Token invalide');
      }

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
