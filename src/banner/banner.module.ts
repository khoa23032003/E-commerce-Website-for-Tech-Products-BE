import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Module({
  controllers: [BannerController],
  providers: [BannerService, CloudinaryProvider],
})
export class BannerModule { }
