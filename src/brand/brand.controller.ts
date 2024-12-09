import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 201, description: 'Brand created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiConsumes('application/x-www-form-urlencoded') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Create brand details with optional file upload',
    type: CreateBrandDto, // Attach the DTO here for Swagger to show the fields
  })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @ApiOperation({ summary: 'Retrieve all brands' })
  @ApiResponse({ status: 200, description: 'All brands retrieved successfully' })
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand found' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @ApiOperation({ summary: 'Update brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand updated successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiConsumes('application/x-www-form-urlencoded') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Update brand details with optional file upload',
    type: UpdateBrandDto, // Attach the DTO here for Swagger to show the fields
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @ApiOperation({ summary: 'Delete brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}
