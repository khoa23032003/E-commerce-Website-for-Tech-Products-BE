import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';

@ApiTags('auth') // Gắn nhãn cho nhóm API
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Tạo tài khoản thành công' })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công' })
  @ApiResponse({ status: 401, description: 'Thông tin đăng nhập sai' })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const userId = req['userId'];
    const email = req['email'];

    console.log('user: ' + userId);
    console.log('email: ' + email);
    return this.authService.login(body.email, body.password, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth() // Yêu cầu Bearer Token trong Swagger
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  @ApiResponse({ status: 200, description: 'Thông tin người dùng' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  async getProfile(@Req() req: Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Bạn chưa đăng nhập');
    }

    const decoded = this.authService.verifyToken(token);
    if (!decoded || !decoded.sub) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
    const userId = decoded.sub;
    return this.authService.getUserInfo(userId);
  }
}
