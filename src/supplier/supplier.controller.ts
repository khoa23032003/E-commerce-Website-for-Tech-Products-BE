import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiResponse({ status: 201, description: 'Supplier created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data for supplier creation' })
  @ApiConsumes('application/x-www-form-urlencoded') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Create supplier details with optional file upload',
    type: CreateSupplierDto, // Attach the DTO here for Swagger to show the fields
  })
  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @ApiOperation({ summary: 'Retrieve all suppliers' })
  @ApiResponse({ status: 200, description: 'Suppliers retrieved successfully' })
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a supplier by ID' })
  @ApiResponse({ status: 200, description: 'Supplier found' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a supplier by ID' })
  @ApiResponse({ status: 200, description: 'Supplier updated successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @ApiConsumes('application/x-www-form-urlencoded') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Update supplier details with optional file upload',
    type: UpdateSupplierDto, // Attach the DTO here for Swagger to show the fields
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @ApiOperation({ summary: 'Delete a supplier by ID' })
  @ApiResponse({ status: 200, description: 'Supplier deleted successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
