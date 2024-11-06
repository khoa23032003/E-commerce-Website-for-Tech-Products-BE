import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CartModule } from './cart/cart.module';
import { BrandModule } from './brand/brand.module';
import { PolicyModule } from './policy/policy.module';
import { BannerModule } from './banner/banner.module';


@Module({

  imports: [ProductModule, CartModule, BrandModule, PolicyModule, BannerModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule { }
