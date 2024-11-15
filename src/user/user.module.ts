import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'HoangTuan', // Thay bằng secret key của bạn
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
