import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { env } from 'src/config/env.config';

@Injectable()
export class InternalSecretGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const secret = req.headers['x-internal-secret'];
    const expectedSecret = env.APP.INTERNAL_SECRET;

    if (!expectedSecret) {
      throw new ForbiddenException('Internal secret not configured');
    }

    if (secret !== expectedSecret) {
      throw new ForbiddenException('Forbidden');
    }

    return true;
  }
}
