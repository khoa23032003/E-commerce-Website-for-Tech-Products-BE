import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Prisma, Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  private prisma = new PrismaClient();

  // tạo danh mục
  async createCategory(data: CreateCategoryDto) {
    const post = await this.prisma.category.create({
      data,
    });
    return {
      success: Boolean(post),
      data: post ?? 'không tạo thành công',
    };
  }

  //tìm kiếm danh mục theo tên
  //mục đích dùng để kiểm tra tên danh mục đã tồn tại hay chưa
  async getCategoryByName(
    name: string,
  ): Promise<{ success: boolean; data: Category[] | string }> {
    const categories = await this.prisma.category.findMany({
      where: { name },
    });

    return {
      success: categories.length > 0,
      data: categories.length > 0 ? categories : 'Không tìm thấy danh mục',
    };
  }

  // lấy toàn bộ thông tin và phân trang
  async getAllCategory(page: number, perPage: number) {
    const perPageInt = parseInt(perPage as any, 10); // ép kiểu về số nguyên
    return this.prisma.category.findMany({
      // perpage số sản phẩm 1 trang
      skip: (page - 1) * perPage,
      take: perPageInt, // lấy sản phẩm
    });
  }

  //tìm danh mục theo id
  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      success: Boolean(category),
      data: category ?? 'không tìm thất danh mục',
    };
  }

  //update danh mục
  async updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
    const update = await this.prisma.category.update({ where: { id }, data });
    return {
      success: Boolean(update),
      data: update ?? 'cập nhật thất bại',
    };
  }

  //đếm số lượng danh mục
  //mục đích thống kế và kiểm tra nếu số lượng 1 không cho xoá
  async countCategories(): Promise<number> {
    return this.prisma.category.count();
  }

  //xoá danh mục
  async deleteCategory(id: string) {
    const deletedCategory = await this.prisma.category.delete({
      where: { id: id },
    });
    return {
      success: true,
      data: deletedCategory,
    };
  }

  findAll() {
    return this.prisma.category.findMany();
  }
}
