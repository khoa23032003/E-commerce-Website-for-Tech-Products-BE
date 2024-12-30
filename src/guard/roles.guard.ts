import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    console.log('Required Roles:', requiredRoles); // Log roles yêu cầu
    console.log('Required Permissions:', requiredPermissions); // Log permissions yêu cầu

    const request = context.switchToHttp().getRequest();
    const userId = request['userId'];

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
    });

    console.log('User Info:', user);
    console.log(
      'User Roles:',
      user.roles.map((role) => role.name),
    );
    // in ra permission của user
    console.log(
      'User Permissions:',
      user.roles
        .map((role) => role.permissions.map((permission) => permission.name))
        .flat(),
    );
    // Kiểm Tra Role
    if (requiredRoles) {
      const hasRole = user.roles.some((role) =>
        requiredRoles.includes(role.name),
      );
      if (!hasRole) {
        console.log('User does not have required role');
        return false;
      }
      console.log('User has required role', hasRole);
    }

    // Kiểm Tra Permission
    if (requiredPermissions) {
      const hasPermission = user.roles.some((role) =>
        role.permissions.some((permission) =>
          requiredPermissions.includes(permission.name),
        ),
      );
      if (!hasPermission) {
        console.log('User does not have required permission');
        return false;
      }
      console.log('User has required permission', hasPermission);
    }

    return true;
  }
}
