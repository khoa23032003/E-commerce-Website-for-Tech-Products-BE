import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS cho một nguồn cụ thể
  app.enableCors({
    origin: 'http://localhost:3000', // Thay bằng URL của frontend
    credentials: true, // Cho phép gửi thông tin xác thực như cookies
  });

  ConfigModule.forRoot({
    isGlobal: true,
  });

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Sử dụng cookie parser
  app.use(cookieParser());

  console.log('COOKIE_EXPIRES_TIME:', process.env.COOKIE_EXPIRES_TIME);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  await app.listen(8080);
}
bootstrap();
