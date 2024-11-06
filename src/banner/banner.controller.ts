import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService,
    private readonly cloudinaryProvider: CloudinaryProvider,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    const uploadResult = await this.cloudinaryProvider.uploadImage(file);
    return this.bannerService.create(
      createBannerDto,
      uploadResult.secure_url,
    );
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  // banner.controller.ts

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    let imageUrl: string;

    // Kiểm tra nếu có file mới thì upload ảnh, nếu không giữ nguyên ảnh cũ
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file);
      imageUrl = uploadResult.secure_url;
    } else {
      imageUrl = updateBannerDto.imageUrl; // Giữ nguyên URL ảnh cũ từ DTO
    }

    return this.bannerService.update(id, updateBannerDto, imageUrl);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
