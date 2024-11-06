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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('accessories')
@Controller('accessory')
export class AccessoryController {
  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly cloudinaryProvider: CloudinaryProvider, // Provider for uploading images to Cloudinary
  ) { }

  // Create a new accessory
  @ApiOperation({ summary: 'Create a new accessory' })
  @ApiResponse({ status: 201, description: 'Accessory created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request due to invalid input' })
  @Post()
  @UseInterceptors(FileInterceptor('imageUrl')) // FileInterceptor for handling uploaded files
  async create(
    @Body() createAccessoryDto: CreateAccessoryDto, // Accessory data from request body
    @UploadedFile() file: Express.Multer.File, // Uploaded file (image)
  ) {
    if (!file) {
      throw new BadRequestException('File image is required');
    }

    // Upload image to Cloudinary
    const uploadResult = await this.cloudinaryProvider.uploadImage(file);

    // Return the created accessory with the uploaded image URL
    return this.accessoryService.create(
      createAccessoryDto, // Accessory details
      uploadResult.secure_url, // Image URL
    );
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
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageUrl')) // FileInterceptor for handling uploaded files
  async update(
    @Param('id') id: string, // Accessory ID for update
    @Body() updateAccessoryDto: UpdateAccessoryDto, // Accessory update details
    @UploadedFile() file?: Express.Multer.File, // Optional file for updating image
  ) {
    let imageUrl: string | undefined;

    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file); // Upload new image if provided
      imageUrl = uploadResult.secure_url;
    }

    return this.accessoryService.update(id, updateAccessoryDto, imageUrl); // Update accessory
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
