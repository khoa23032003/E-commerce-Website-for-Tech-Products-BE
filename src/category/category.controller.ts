import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  Patch,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create Category
  // category.controller.ts
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Tạo thành công danh mục' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    // Trước khi khởi tạo category, kiểm tra xem tên đã được khởi tạo từ trước hay chưa
    const existingCategory = await this.categoryService.getCategoryByName(
      data.name,
    );
    // if (existingCategory) {
    //   throw new BadRequestException('Tên danh mục đã tồn tại');
    // }

    // Sử dụng service để tạo category và trả về kết quả
    const result = await this.categoryService.createCategory(data);

    if (!result.success) {
      throw new BadRequestException(result.data);
    }

    return result.data; // Trả về thông tin category đã tạo thành công
  }

  // Get all Categories
  // lấy thông tin và phân trang
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Tạo thành công danh mục' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Get('get-all-category/:page/:perPage')
  async getAllDocPerPage(
    @Param('page') page: number,
    @Param('perPage') perPage: number,
  ) {
    return this.categoryService.getAllCategory(page, perPage);
  }

  // Get Category by ID
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Tạo thành công danh mục' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  //Get Category by Name
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Tạo thành công danh mục' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Get('search/:name')
  async getCategoryByName(
    @Param('name') name: string,
  ): Promise<{ success: boolean; data: Category[] | string }> {
    return this.categoryService.getCategoryByName(name);
  }

  @Put('update/:id')
  async updateDocument(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  // Delete Category by ID
  @Delete('delete/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
