import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('banners')
@Controller('banner')
export class BannerController {
  constructor(
    private readonly bannerService: BannerService,
    private readonly cloudinaryProvider: CloudinaryProvider,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new banner' })
  @ApiResponse({ status: 201, description: 'Banner successfully created' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or file upload error',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    const uploadResult = await this.cloudinaryProvider.uploadImage(file);
    if (!uploadResult) {
      throw new BadRequestException('File upload failed');
    }
    return this.bannerService.create(createBannerDto, uploadResult.secure_url);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all banners' })
  @ApiResponse({ status: 200, description: 'Banners retrieved successfully' })
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific banner by ID' })
  @ApiResponse({ status: 200, description: 'Banner retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Banner not found' })
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a banner by ID' })
  @ApiResponse({ status: 200, description: 'Banner updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or file upload error',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    let imageUrl: string;

    // Check if a new file is uploaded, otherwise retain the old URL
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file);
      if (!uploadResult) {
        throw new BadRequestException('File upload failed');
      }
      imageUrl = uploadResult.secure_url;
    } else {
      imageUrl = updateBannerDto.imageUrl; // Keep existing image URL from DTO
    }

    return this.bannerService.update(id, updateBannerDto, imageUrl);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a banner by ID' })
  @ApiResponse({ status: 200, description: 'Banner deleted successfully' })
  @ApiResponse({ status: 404, description: 'Banner not found' })
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
