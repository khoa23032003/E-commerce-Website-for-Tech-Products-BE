import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Sử dụng JwtService

import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  // private users: Model<User> // Mảng lưu trữ người dùng
  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) { } // Inject JwtService


  // async create(createUserDto: CreateUserDto) {
  //   // Thực hiện logic tạo người dùng
  //   return await this.prisma.user.create({
  //     data: {
  //       email: createUserDto.email,
  //       password: createUserDto.password, // Mã hóa mật khẩu nếu cần
  //       name: createUserDto.name,
  //     },
  //   });
  // }

  // Đăng ký người dùng
  async register(createUserDto: CreateUserDto) {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Mã hóa mật khẩu với bcrypt
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Tạo người dùng mới và lưu vào cơ sở dữ liệu
    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,

      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
      role: newUser.role,
    }; // Trả về thông tin người dùng đã đăng ký, không bao gồm mật khẩu
  }

  // Đăng nhập
  async validateUser(email: string, password: string): Promise<any> {
    // Tìm người dùng theo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // So sánh mật khẩu đã mã hóa
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Xác thực người dùng
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // Tạo JWT token
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
