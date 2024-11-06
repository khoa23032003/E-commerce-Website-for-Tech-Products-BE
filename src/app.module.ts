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
import { CategoryModule } from './category/category.module';

@Module({

  imports: [ProductModule, CategoryModule, CartModule, NavbarModule, AccessoryModule, OriginModule, SupplierModule, BrandModule],


  imports: [ProductModule, CategoryModule, CartModule, NavbarModule, PolicyModule, BrandModule],


  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule { }
