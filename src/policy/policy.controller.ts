import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('policy')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) { }

  @ApiOperation({ summary: 'Create a new policy' })
  @ApiResponse({ status: 201, description: 'Policy created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data for policy creation' })
  @ApiConsumes('application/x-www-form-urlencoded') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Create policy details with optional file upload',
    type: CreatePolicyDto, // Attach the DTO here for Swagger to show the fields
  })
  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policyService.create(createPolicyDto);
  }

  @ApiOperation({ summary: 'Retrieve all policies' })
  @ApiResponse({ status: 200, description: 'Policies retrieved successfully' })
  @Get()
  findAll() {
    return this.policyService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a policy by ID' })
  @ApiResponse({ status: 200, description: 'Policy found' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a policy by ID' })
  @ApiResponse({ status: 200, description: 'Policy updated successfully' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  @ApiConsumes('application/x-www-form-urlencoded') // Specify that this endpoint consumes form-data for file upload
  @ApiBody({
    description: 'Update policy details with optional file upload',
    type: UpdatePolicyDto, // Attach the DTO here for Swagger to show the fields
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policyService.update(id, updatePolicyDto);
  }

  @ApiOperation({ summary: 'Delete a policy by ID' })
  @ApiResponse({ status: 200, description: 'Policy deleted successfully' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyService.remove(id);
  }
}
