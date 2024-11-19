import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Đăng ký người dùng
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // Tìm người dùng qua email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Tìm người dùng qua ID
  async findById(id: string): Promise<User | null> {
    console.log('id', id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
