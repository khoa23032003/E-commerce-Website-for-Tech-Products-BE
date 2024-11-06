
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PolicyService {
  private prisma = new PrismaClient();



  //Tạo chính sách

  async create(createPolicyDto: CreatePolicyDto) {
    const policy = await this.prisma.policy.create({
      data: createPolicyDto,
    });
    return {
      success: Boolean(policy),
      data: policy ?? 'Tạo chính sách không thành công'
    }
  }

  //Lấy danh sách chính sách
  async findAll() {
    return await this.prisma.policy.findMany()
  }

  //Lấy danh sách chính sách theo id
  async findOne(id: string) {
    const policy = await this.prisma.policy.findUnique({ where: { id } });
    if (!policy) {
      throw new NotFoundException('Policy is not found');
    }

    return {
      success: Boolean(policy),
      data: policy ?? 'Không tìm thấy chính sách'
    }
  }

  //Cập nhật thông tin chính sách
  async update(id: string, data: UpdatePolicyDto) {
    const policy = await this.prisma.policy.update({ where: { id }, data })
    return {
      success: Boolean(policy),
      data: policy ?? 'Cập nhật thông tin chính sách thất bại'
    }
  }

  //Xóa chính sách
  async remove(id: string) {
    const deletedPolicy = await this.prisma.policy.delete({
      where: { id: id },
    });
    return {
      success: true,
      data: deletedPolicy ?? 'Xóa thương hiệu không thành công',
    };

  }
}
