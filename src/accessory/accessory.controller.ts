import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('accessories')
@Controller('accessory')
export class AccessoryController {
  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly cloudinaryProvider: CloudinaryProvider, // Provider for uploading images to Cloudinary
  ) { }

  @ApiOperation({ summary: 'Create a new accessory' })
  @ApiResponse({ status: 201, description: 'Accessory created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request due to invalid input' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Accessory data with an image file',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The name of the accessory' },
        description: { type: 'string', description: 'The description of the accessory' },
        price: { type: 'number', description: 'The price of the accessory' },
        imageUrl: {
          type: 'string',
          format: 'binary',
          description: 'The image file of the accessory'
        },
        stock: { type: 'number', description: 'The stock quantity of the accessory' },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(

    @Body() createAccessoryDto: CreateAccessoryDto, // Accessory update details
    @UploadedFile() file?: Express.Multer.File, // Optional file for updating image
  ) {
    let imageUrl: string | undefined;

    // Nếu có file, thực hiện tải lên hình ảnh
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file); // Upload new image if provided
      imageUrl = uploadResult.secure_url;
    }

    // Kiểm tra và ép kiểu trường price về dạng float
    if (createAccessoryDto.price) {
      createAccessoryDto.price = parseFloat(createAccessoryDto.price.toString()); // Chuyển giá trị price thành float
    }

    // Kiểm tra và ép kiểu trường stock về dạng integer
    if (createAccessoryDto.stock) {
      createAccessoryDto.stock = parseInt(createAccessoryDto.stock.toString(), 10); // Chuyển giá trị stock thành int
    }

    return this.accessoryService.create(createAccessoryDto, imageUrl); // Gọi service để cập nhật phụ kiện
  }

  // Get all accessories
  @ApiOperation({ summary: 'Get all accessories' })
  @ApiResponse({ status: 200, description: 'Fetched all accessories successfully' })
  @Get()
  findAll() {
    return this.accessoryService.findAll(); // Fetch all accessories
  }

  // Get a specific accessory by ID
  @ApiOperation({ summary: 'Get accessory by ID' })
  @ApiResponse({ status: 200, description: 'Fetched accessory by ID' })
  @ApiResponse({ status: 404, description: 'Accessory not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryService.findOne(id); // Fetch accessory by ID
  }

  // Update an existing accessory
  @ApiOperation({ summary: 'Update an existing accessory' })
  @ApiResponse({ status: 200, description: 'Accessory updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request due to invalid input' })
  @ApiConsumes('multipart/form-data') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Update accessory details with optional file upload',
    type: UpdateAccessoryDto, // Attach the DTO here for Swagger to show the fields
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageUrl')) // FileInterceptor for handling uploaded files
  async update(
    @Param('id') id: string, // Accessory ID for update
    @Body() updateAccessoryDto: UpdateAccessoryDto, // Accessory update details
    @UploadedFile() file?: Express.Multer.File, // Optional file for updating image
  ) {
    let imageUrl: string | undefined;

    // Nếu có file, thực hiện tải lên hình ảnh
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file); // Upload new image if provided
      imageUrl = uploadResult.secure_url;
    }

    // Kiểm tra và ép kiểu trường price về dạng float
    if (updateAccessoryDto.price) {
      updateAccessoryDto.price = parseFloat(updateAccessoryDto.price.toString()); // Chuyển giá trị price thành float
    }

    // Kiểm tra và ép kiểu trường stock về dạng integer
    if (updateAccessoryDto.stock) {
      updateAccessoryDto.stock = parseInt(updateAccessoryDto.stock.toString(), 10); // Chuyển giá trị stock thành int
    }

    return this.accessoryService.update(id, updateAccessoryDto, imageUrl); // Gọi service để cập nhật phụ kiện
  }

  // Delete an accessory by ID
  @ApiOperation({ summary: 'Delete accessory by ID' })
  @ApiResponse({ status: 200, description: 'Accessory deleted successfully' })
  @ApiResponse({ status: 404, description: 'Accessory not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessoryService.remove(id); // Delete accessory by ID
  }
}
