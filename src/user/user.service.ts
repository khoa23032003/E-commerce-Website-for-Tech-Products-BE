import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  jwtService: any;


  constructor(private prisma: PrismaService) {}


  // Đăng ký người dùng
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // Tìm người dùng qua email
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  // async login(loginUserDto: LoginUserDto) {
  //   const { email, password } = loginUserDto;

  //   // Xác thực người dùng
  //   const user = await this.validateUser(email, password);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }
  //   // Tạo JWT token
  //   const payload = { email: user.email, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user,
  //   };
  // }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Tìm người dùng qua ID
  async findById(id: string): Promise<User | null> {
    console.log('id', id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserRoles(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });
  }

  async assignRole(userId: string, roleId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roleIds: { push: roleId },
      },
    });
  }
}
