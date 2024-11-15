import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NavbarService } from './navbar.service';
import { CreateNavbarDto } from './dto/create-navbar.dto';
import { UpdateNavbarDto } from './dto/update-navbar.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('navbar')
@Controller('navbar')
export class NavbarController {
  constructor(private readonly navbarService: NavbarService) {}

  @ApiOperation({ summary: 'Create a new navbar item' })
  // TẠO TRƯỜNG NHẬP DỮ LIỆU
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'The data for updating a major and its details, including selective image updates',
    type: UpdateNavbarDto, // Ensure you have an UpdateMajorDto for this
  })
  @ApiResponse({ status: 201, description: 'Navbar item created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createNavbarDto: CreateNavbarDto) {
    return this.navbarService.create(createNavbarDto);
  }

  @ApiOperation({ summary: 'Retrieve all navbar items' })
  @ApiResponse({
    status: 200,
    description: 'Navbar items retrieved successfully',
  })
  @Get()
  findAll() {
    return this.navbarService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve navbar item by ID' })
  @ApiResponse({ status: 200, description: 'Navbar item found' })
  @ApiResponse({ status: 404, description: 'Navbar item not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navbarService.findOne(id);
  }

  @ApiOperation({ summary: 'Update navbar item by ID' })
  @ApiResponse({ status: 200, description: 'Navbar item updated successfully' })
  @ApiResponse({ status: 404, description: 'Navbar item not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavbarDto: UpdateNavbarDto) {
    return this.navbarService.update(id, updateNavbarDto);
  }

  @ApiOperation({ summary: 'Delete navbar item by ID' })
  @ApiResponse({ status: 200, description: 'Navbar item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Navbar item not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navbarService.remove(id);
  }
}
