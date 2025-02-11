import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return this.userService.getRolesForUser(user.id).then((userRoles) => {
      const hasRole = userRoles.some((role) => requiredRoles.includes(role));
      if (!hasRole) {
        throw new ForbiddenException(
          'You do not have the required role to access this resource',
        );
      }
      return true;
    });
  }
}
