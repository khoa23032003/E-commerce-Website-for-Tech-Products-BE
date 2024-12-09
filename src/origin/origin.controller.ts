import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OriginService } from './origin.service';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('origin') // Grouping the routes under the "origin" tag in Swagger UI
@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) { }

  @ApiOperation({ summary: 'Create a new origin' })
  @ApiResponse({ status: 201, description: 'Origin successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })

  @ApiBody({ type: CreateOriginDto, description: 'The origin data to be created' })
  @Post()
  create(@Body() createOriginDto: CreateOriginDto) {
    return this.originService.create(createOriginDto);
  }

  // Get all origins
  @ApiOperation({ summary: 'Get all origins' })
  @ApiResponse({ status: 200, description: 'List of all origins' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  findAll() {
    return this.originService.findAll();
  }

  // Get a specific origin by ID
  @ApiOperation({ summary: 'Get a specific origin by ID' })
  @ApiResponse({ status: 200, description: 'Origin details found' })
  @ApiResponse({ status: 404, description: 'Origin not found' })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.originService.findOne(id);
  }

  // Update an existing origin
  @ApiOperation({ summary: 'Update an existing origin' })
  @ApiResponse({ status: 200, description: 'Origin successfully updated' })
  @ApiResponse({ status: 404, description: 'Origin not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: CreateOriginDto, description: 'The origin data to be updated' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOriginDto: UpdateOriginDto) {
    return this.originService.update(id, updateOriginDto);
  }

  // Delete an origin
  @ApiOperation({ summary: 'Delete an origin' })
  @ApiResponse({ status: 200, description: 'Origin successfully deleted' })
  @ApiResponse({ status: 404, description: 'Origin not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.originService.remove(id);
  }
}
