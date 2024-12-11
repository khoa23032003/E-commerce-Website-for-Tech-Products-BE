import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name, description, permissionIds } = createRoleDto;
    return this.prisma.role.create({
      data: {
        name,
        description,
        permissions: {
          connect: permissionIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
  }
  // gán permisscion cho role
  async assignPermissions(roleId: string, permissionIds: string[]) {
    return this.prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: permissionIds.map((id) => ({ id })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  // gán role cho user
  async assignRoleToUser(userId: string, roleIds: string[]) {
    if (!Array.isArray(roleIds)) {
      throw new Error('roleIds must be an array');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          connect: roleIds.map((id) => ({ id })), 
        },
      },
      include: {
        roles: {
          include: {
            permissions: true, // Bao gồm quyền của role
          },
        },
      },
    });
  }
  
}
