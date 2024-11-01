import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaClient } from '@prisma/client';

import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Injectable()
export class ProductService {
  prisma = new PrismaClient();

  constructor(private cloudinaryService: CloudinaryProvider) {}

  async create(createProductDto: CreateProductDto, imageUrl: string) {
    const newProduct = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: Number(createProductDto.price),
        categoryId: createProductDto.categoryId,
        imageUrl: imageUrl,
        stock: createProductDto.stock || 0,
      },
    });

    return newProduct;
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateCategoryDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
