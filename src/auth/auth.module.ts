import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware'; // Import middleware của bạn

export const jwtSecret = process.env.JWT_SECRET;

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // Đăng ký middleware của bạn
      .forRoutes({ path: 'auth/me', method: RequestMethod.GET }); // Chỉ áp dụng cho route 'auth/me', bạn có thể thay đổi tùy theo nhu cầu
  }
}
