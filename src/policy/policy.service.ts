import { Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PolicyService {
  private prisma = new PrismaClient();

  async create(createPolicyDto: CreatePolicyDto) {
    const policy = await this.prisma.policy.create({
      data: createPolicyDto,
    });
    return {
      success: Boolean(policy),
      data: policy ?? 'ko',
    };
  }

  findAll() {
    return `This action returns all policy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} policy`;
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
}
