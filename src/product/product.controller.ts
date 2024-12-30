import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('product') // Grouping the routes under the "product" tag in Swagger UI
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryProvider: CloudinaryProvider,
  ) { }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product data with an image file',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Smartphone' },
        description: { type: 'string', example: 'A high-end smartphone' },
        price: { type: 'number', example: 999.99 },
        categoryId: { type: 'string', example: '64c93b81e4893c7b88812345' },
        imageUrl: { type: 'string', format: 'binary' },
        stock: { type: 'string', example: '10' }, // Đảm bảo rằng stock là số hoặc chuỗi có thể chuyển thành số
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    let imageUrl;

    // Xử lý upload hình ảnh
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file);
      imageUrl = uploadResult.secure_url;
    }

    // Chuyển price thành float nếu có
    if (createProductDto.price) {
      createProductDto.price = parseFloat(createProductDto.price.toString());
    }

    // Kiểm tra và ép kiểu stock về dạng integer nếu có
    if (createProductDto.stock) {
      const stockValue = parseInt(createProductDto.stock.toString(), 10);

      // Kiểm tra nếu stockValue là một số hợp lệ
      if (!isNaN(stockValue)) {
        createProductDto.stock = stockValue; // Chuyển giá trị stock thành int
      } else {
        throw new Error('Invalid stock value. It should be a valid integer.');
      }
    }

    return this.productService.create(createProductDto, imageUrl);
  }





  // {
  //   const uploadResult = await this.cloudinaryProvider.uploadImage(file);
  //   return this.productService.create(
  //     createProductDto,
  //     uploadResult.secure_url,
  //   );
  // }


  // Get all products
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Get a specific product by ID
  @ApiOperation({ summary: 'Get a specific product by ID' })
  @ApiResponse({ status: 200, description: 'Product details found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id); // Gọi đúng method từ service
  }



  // Update an existing product with image upload
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Updated product data with an optional image file',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Smartphone' },
        description: { type: 'string', example: 'An updated high-end smartphone' },
        price: { type: 'number', example: 1099.99 },
        categoryId: { type: 'string', example: '64c93b81e4893c7b88812345' },
        stock: { type: 'number', example: 50 },
        imageUrl: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ) {
    let imageUrl;
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file);
      imageUrl = uploadResult.secure_url;
    }
    if (updateProductDto.price) {
      updateProductDto.price = parseFloat(updateProductDto.price.toString()); // Chuyển giá trị price thành float
    }

    // Kiểm tra và ép kiểu trường stock về dạng integer
    if (updateProductDto.stock) {
      updateProductDto.stock = parseInt(updateProductDto.stock.toString(), 10); // Chuyển giá trị stock thành int
    }

    return this.productService.update(id, updateProductDto, imageUrl);
  }


  // @ApiOperation({ summary: 'Update an existing accessory' })
  // @ApiResponse({ status: 200, description: 'Accessory updated successfully' })
  // @ApiResponse({ status: 400, description: 'Bad request due to invalid input' })
  // @ApiConsumes('multipart/form-data') // Specify that this endpoint consumes form-data for file upload
  // @ApiBody({
  //   description: 'Update accessory details with optional file upload',
  //   type: UpdateProductDto, // Attach the DTO here for Swagger to show the fields
  // })
  // @Patch(':id')
  // @UseInterceptors(FileInterceptor('imageUrl')) // FileInterceptor for handling uploaded files
  // async update(
  //   @Param('id') id: string, // Accessory ID for update
  //   @Body() updateProductDto: UpdateProductDto, // Accessory update details
  //   @UploadedFile() file?: Express.Multer.File, // Optional file for updating image
  // ) {
  //   let imageUrl: string | undefined;

  //   // If file is provided, upload it and get the image URL
  //   if (file) {
  //     const uploadResult = await this.cloudinaryProvider.uploadImage(file);
  //     imageUrl = uploadResult.secure_url;
  //   }

  //   // Validate and parse fields like price and stock if necessary
  //   if (updateProductDto.price !== undefined) {
  //     updateProductDto.price = parseFloat(updateProductDto.price.toString());
  //   }
  //   if (updateProductDto.stock !== undefined) {
  //     updateProductDto.stock = parseInt(updateProductDto.stock.toString(), 10);
  //   }

  //   // Call the service to update the product with the parsed data and optional imageUrl
  //   return this.productService.update(id, updateProductDto, imageUrl);
  // }

  // Delete a product by ID
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
