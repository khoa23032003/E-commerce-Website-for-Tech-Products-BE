import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CartModule } from './cart/cart.module';
import { NavbarModule } from './navbar/navbar.module';
import { AccessoryModule } from './accessory/accessory.module';
import { OriginModule } from './origin/origin.module';
import { SupplierModule } from './supplier/supplier.module';

import { BrandModule } from './brand/brand.module';
import { PolicyModule } from './policy/policy.module';
import { BannerModule } from './banner/banner.module';




@Module({
<<<<<<< HEAD
  imports: [ProductModule, CategoryModule, CartModule, NavbarModule, AccessoryModule, OriginModule, SupplierModule],
=======
  imports: [ProductModule, CategoryModule, CartModule, NavbarModule, PolicyModule, BrandModule],

>>>>>>> 02523ee6d4c6bbf507ce931b941a93ce37fa33d6
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule { }
