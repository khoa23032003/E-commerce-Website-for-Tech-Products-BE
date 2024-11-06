import { Injectable } from '@nestjs/common';
import { CreateNavbarDto } from './dto/create-navbar.dto';
import { UpdateNavbarDto } from './dto/update-navbar.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NavbarService {
  private prisma = new PrismaClient();
  async create(createNavbarDto: CreateNavbarDto) {
    const navBar = await this.prisma.navbar.create({ data: createNavbarDto });
    return {
      success: Boolean(navBar),
      data: navBar ?? 'không tạo được đối tượng',
    };
  }

  async findAll() {
    const navBar = await this.prisma.navbar.findMany();
    return {
      success: Boolean(navBar),
      data: navBar ?? 'không có danh mục nào',
    };
  }

  async findOne(id: string) {
    const navBar = await this.prisma.navbar.findUnique({ where: { id } });
    return {
      success: Boolean(navBar),
      data: navBar ?? 'không tìm thấy danh mục',
    };
  }

  async update(id: string, updateNavbarDto: UpdateNavbarDto) {
    const navBar = await this.prisma.navbar.update({
      where: { id },
      data: updateNavbarDto,
    });
    return {
      success: Boolean(navBar),
      data: navBar ?? 'không thể cập nhật danh mục',
    };
  }

  async remove(id: string) {
    const navBar = await this.prisma.navbar.delete({ where: { id } });
    return {
      success: Boolean(navBar),
      data: navBar ?? 'Xoá danh mục không thành công ',
    };
  }
}
