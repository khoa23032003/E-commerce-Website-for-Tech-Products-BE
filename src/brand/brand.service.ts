import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class BrandService {
  private prisma = new PrismaClient();

  //thêm brand
  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.prisma.brand.create({
      data: createBrandDto,
    });
    return {
      success: Boolean(brand),
      data: brand ?? 'Tạo thương hiệu không thành công'
    }
  }
  //Lấy danh sách brand
  async findAll() {
    return await this.prisma.brand.findMany();
  }


  //tìm brand theo id
  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return {
      success: Boolean(brand),
      data: brand ?? 'Không tìm thấy thương hiệu',
    };
  }

  //Sửa thông tin brand
  async update(id: string, data: UpdateBrandDto) {
    const brand = await this.prisma.brand.update({ where: { id }, data })
    return {
      success: Boolean(brand),
      data: brand ?? 'Không thể cập nhật thông tin thương hiệu',
    };
  }
  //xóa brand
  async deleteBrand(id: string) {
    const deletedBrand = await this.prisma.brand.delete({
      where: { id: id },
    });
    return {
      success: true,
      data: deletedBrand ?? 'Xóa thương hiệu không thành công',
    };
  }


}
