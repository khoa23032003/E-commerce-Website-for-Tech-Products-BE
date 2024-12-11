import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleGuard } from '../guard/roles.guard';

@Controller('roles')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  //@Permissions('create-role')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  //@Permissions('view-role')
  async findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  //@Permissions('view-role')
  async findOne(@Param('id') id: string) {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  // Gán permissions cho role từ body
  @Put('permissions')
  async assignPermissions(
    @Body() body: { roleId: string; permissionIds: string[] },  
  ) {
    return this.roleService.assignPermissions(body.roleId, body.permissionIds);
  }

  // Gán role cho user từ body
  @Put('roles')
  async assignRoleToUser(
    @Body() body: { userId: string; roleId: string[] }, 
  ) {
    console.log('RoleIds:', body.roleId);

    if (!Array.isArray(body.roleId)) {
      throw new Error('roleIds must be an array');
    }
    return this.roleService.assignRoleToUser(body.userId, body.roleId);
  }



}
