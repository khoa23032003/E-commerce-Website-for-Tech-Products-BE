import { Injectable } from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OriginService {
  private prisma = new PrismaClient();

  async create(createOriginDto: CreateOriginDto) {
    const origin = await this.prisma.origin.create({ data: createOriginDto });
    return {
      success: Boolean(origin),
      data: origin ?? 'Không tạo được đối tượng nguồn',
    };
  }

  async findAll() {
    const origins = await this.prisma.origin.findMany();
    return {
      success: Boolean(origins),
      data: origins ?? 'Không có nguồn nào',
    };
  }

  async findOne(id: string) {
    const origin = await this.prisma.origin.findUnique({ where: { id } });
    return {
      success: Boolean(origin),
      data: origin ?? 'Không tìm thấy nguồn',
    };
  }

  async update(id: string, updateOriginDto: UpdateOriginDto) {
    const origin = await this.prisma.origin.update({
      where: { id },
      data: updateOriginDto,
    });
    return {
      success: Boolean(origin),
      data: origin ?? 'Không thể cập nhật nguồn',
    };
  }

  async remove(id: string) {
    const origin = await this.prisma.origin.delete({ where: { id } });
    return {
      success: Boolean(origin),
      data: origin ?? 'Xoá nguồn không thành công',
    };
  }
}
