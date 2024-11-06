import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaClient } from '@prisma/client';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule khả dụng trên toàn bộ ứng dụng
    }),
    ProductModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryProvider, PrismaClient],
})
export class ProductModule { }
