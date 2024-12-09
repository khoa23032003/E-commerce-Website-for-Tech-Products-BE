import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthMiddleware } from '../auth/auth.middleware';

// Đọc biến môi trường JWT_SECRET hoặc dùng giá trị mặc định
const jwtSecret = process.env.JWT_SECRET || 'hoangtuan';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Sử dụng biến môi trường trên toàn bộ app
    }),
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret, // Truyền giá trị secret
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController], // Đúng controller cho UserModule
  providers: [UserService], // Service dành riêng cho UserModule
  exports: [UserService], // Export UserService để các module khác dùng được
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController); // Áp dụng middleware cho UserController
  }
}
