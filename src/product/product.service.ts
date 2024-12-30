import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaClient } from '@prisma/client';

import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  prisma = new PrismaClient();

  constructor(private cloudinaryService: CloudinaryProvider) { }

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

  async findAll() {
    return this.prisma.product.findMany();
  }


  async findOne(id: string) {

    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  //update product
  async update(id: string, updateProductDto: UpdateProductDto, imageUrl?: string) {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: Number(updateProductDto.price),
        categoryId: updateProductDto.categoryId,
        imageUrl: imageUrl,
        stock: updateProductDto.stock || 0,
      },
    });

    return updatedProduct;
  }


  //remove product
  async remove(id: string) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id },
    });
    return {
      success: true,
      data: deletedProduct ?? 'Xóa sản phẩm không thành công',
    };

  }
}
