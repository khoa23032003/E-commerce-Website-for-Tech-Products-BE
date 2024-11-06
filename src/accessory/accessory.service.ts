import { Injectable } from '@nestjs/common';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AccessoryService {
  private prisma = new PrismaClient();
  async create(createAccessoryDto: CreateAccessoryDto, imageUrl: string) {
    const accessory = await this.prisma.accessory.create({
      data: {
        name: createAccessoryDto.name,
        description: createAccessoryDto.description,
        price: parseInt(createAccessoryDto.price as unknown as string, 10), // Chuyển chuỗi thành số nguyên
        imageUrl: imageUrl,
        stock: createAccessoryDto.stock,
      },
    });
    return {
      success: Boolean(accessory),
      data: accessory ?? 'không thể thêm linh kiện',
    };
  }

  async findAll() {
    const accessory = await this.prisma.accessory.findMany();
    return {
      success: Boolean(accessory),
      data: accessory ?? 'không có phụ kiện nào',
    };
  }

  async findOne(id: string) {
    const accessory = await this.prisma.accessory.findUnique({ where: { id } });
    return {
      success: Boolean(accessory),
      data: accessory ?? 'không tìm thấy phụ kiện',
    };
  }

  async update(
    id: string,
    updateAccessoryDto: UpdateAccessoryDto,
    imageUrl: string,
  ) {
    const accessory = await this.prisma.accessory.update({
      where: { id },
      data: {
        name: updateAccessoryDto.name,
        description: updateAccessoryDto.description,
        price: updateAccessoryDto.price,
        imageUrl: imageUrl,
        stock: updateAccessoryDto.stock,
      },
    });
    return {
      success: Boolean(accessory),
      data: accessory ?? 'Cập nhập thông tin phụ kiện không thành công',
    };
  }

  async remove(id: string) {
    const accessory = await this.prisma.accessory.delete({ where: { id } });
    return {
      success: Boolean(accessory),
      data: accessory ?? 'không thể xoá phụ kiện',
    };
  }
}
