import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  Type,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleName } from '../constants/user.constant';

export const RoleGuard = (role: number): Type<any> => {
  @Injectable()
  class RoleGuardMixin extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const can = (await super.canActivate(context)) as boolean;
      if (!can) return false;

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user || user.role !== role) {
        throw new ForbiddenException(`${UserRoleName[role]} access only`);
      }
      return true;
    }
  }
  return RoleGuardMixin;
};
