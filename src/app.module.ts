import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CartModule } from './cart/cart.module';
import { NavbarModule } from './navbar/navbar.module';
import { PolicyModule } from './policy/policy.module';

import { BrandModule } from './brand/brand.module';
import { PolicyModule } from './policy/policy.module';
import { BannerModule } from './banner/banner.module';




@Module({
  imports: [ProductModule, CategoryModule, CartModule, NavbarModule, PolicyModule, BrandModule],

  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule { }
