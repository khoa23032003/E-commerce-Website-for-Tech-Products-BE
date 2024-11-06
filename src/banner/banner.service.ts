import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaClient } from '@prisma/client';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Injectable()
export class BannerService {
  private prisma = new PrismaClient();
  constructor(private cloudinaryService: CloudinaryProvider) { }

  async create(createBannerDto: CreateBannerDto, imageUrl: string) {
    const newProduct = await this.prisma.banner.create({
      data: {
        title: createBannerDto.title,
        imageUrl: imageUrl,
        link: createBannerDto.link,
      },
    });

    return newProduct;
  }

  async findAll() {
    return await this.prisma.banner.findMany();
  }


  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    return {
      success: Boolean(banner),
      data: banner ?? 'Không tìm thấy banner'
    }
  }

  async update(id: string, updateBannerDto: UpdateBannerDto, imageUrl?: string) {
    const updatedBanner = await this.prisma.banner.update({
      where: { id: id },
      data: {
        title: updateBannerDto.title,
        imageUrl: imageUrl || updateBannerDto.imageUrl, // Sử dụng imageUrl mới nếu có, nếu không giữ nguyên
        link: updateBannerDto.link,
      },
    });

    return updatedBanner;
  }


  async remove(id: string) {
    const banner = await this.prisma.banner.delete({ where: { id: id } });
    return {
      success: true,
      data: banner ?? 'Xóa banner thất bại'
    }
  }
}
