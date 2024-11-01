import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

@Controller('policy')
export class PolicyController {
  private prisma: PrismaClient; // Khai báo prisma là kiểu PrismaClient

  constructor(private readonly policyService: PolicyService) {
    this.prisma = new PrismaClient(); // Khởi tạo Prisma Client trong constructor
  }

  @Post()
  async create(@Body() createPolicyDto: CreatePolicyDto) {
    return await this.prisma.policy.create({
      data: createPolicyDto, // Gửi dữ liệu từ DTO vào Prisma
    });
  }

  @Get()
  findAll() {
    return this.policyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policyService.update(+id, updatePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyService.remove(+id);
  }
}
