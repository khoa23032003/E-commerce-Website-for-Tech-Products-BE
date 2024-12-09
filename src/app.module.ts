import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';

// Services
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';

// Modules
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { NavbarModule } from './navbar/navbar.module';
import { AccessoryModule } from './accessory/accessory.module';
import { OriginModule } from './origin/origin.module';
import { SupplierModule } from './supplier/supplier.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { PolicyModule } from './policy/policy.module';
import { BannerModule } from './banner/banner.module';
import { UserModule } from './user/user.module';

import { PrismaModule } from './prisma/prisma.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Feature Modules
    ProductModule,
    CategoryModule,
    CartModule,
    NavbarModule,
    AccessoryModule,
    OriginModule,
    SupplierModule,
    BrandModule,
    PolicyModule,
    BannerModule,
    UserModule,
    JwtModule,
    PrismaModule,

    // JWT Module Configuration
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // Adjust expiration time as needed
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, CloudinaryProvider, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
