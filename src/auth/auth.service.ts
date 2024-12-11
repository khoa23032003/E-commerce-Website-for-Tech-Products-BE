import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { LoginDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private prisma = new PrismaClient();

  async register(email: string, password: string, name: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser({
      email,
      password: hashedPassword,
      name,
      roles: {
        connect: [{ name: 'USER' }],
      },
    });
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      return {
        success: false,
        message: 'Tài khoản không tồn tại hoặc không được kích hoạt.',
      };
    }
    // kiểm tra password có đúng không
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );    
    if (!isPasswordValid) {
      return {
        success: false,
        result: 'sai mật khẩu',
      };    }

    const payload = { id: user.id, email: user.email};
    //console.log('payload', payload);

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'hoangtuan', // Truyền secret trực tiếp
    });
    
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000,
      ),
    });

    return {
      success: Boolean(payload),
      result: token ?? 'Không tạo được token!!!',
    };
  }

  async getUserInfo(userId: string) {
    console.log('userId', userId);
    if(!userId){
      return {
        success: false,
        result: 'Không tìm thấy user'
      }
    }
    const x= await this.prisma.user.findUnique({
      where: { id: userId }
    });
    return{
      success: Boolean(x),
      result: x ?? 'Không tìm thấy user'
    }
  }
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
