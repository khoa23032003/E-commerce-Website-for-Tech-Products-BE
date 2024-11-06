import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SupplierService {
  private prisma = new PrismaClient();

  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = await this.prisma.supplier.create({
      data: createSupplierDto,
    });
    return {
      success: Boolean(supplier),
      data: supplier ?? 'Không tạo được nhà cung cấp',
    };
  }

  async findAll() {
    const suppliers = await this.prisma.supplier.findMany();
    return {
      success: Boolean(suppliers),
      data: suppliers ?? 'Không có nhà cung cấp nào',
    };
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    return {
      success: Boolean(supplier),
      data: supplier ?? 'Không tìm thấy nhà cung cấp',
    };
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
    return {
      success: Boolean(supplier),
      data: supplier ?? 'Không thể cập nhật nhà cung cấp',
    };
  }

  async remove(id: string) {
    const supplier = await this.prisma.supplier.delete({ where: { id } });
    return {
      success: Boolean(supplier),
      data: supplier ?? 'Xoá nhà cung cấp không thành công',
    };
  }
}
