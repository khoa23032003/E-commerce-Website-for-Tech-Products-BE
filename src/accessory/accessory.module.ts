import { Module } from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { AccessoryController } from './accessory.controller';
import { PrismaClient } from '@prisma/client';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Module({
  controllers: [AccessoryController],
  providers: [AccessoryService, PrismaClient, CloudinaryProvider],
})
export class AccessoryModule { }
