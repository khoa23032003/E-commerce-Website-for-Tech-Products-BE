import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guard/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Permissions } from '../decorators/permissions.decorator';

@Controller('user')
@UseGuards(RoleGuard)
export class UserController {
  @Get('admin')
  @Roles('admin')
  @Permissions('admin')
  findAllAdmin() {
    return 'This route is restricted to admin role.';
  }
  @Get()
  findAll(@Req() req: Request) {
    const userId = req['userId'];
    console.log("user: " + userId);
    return 'This route is user.';
  }
  @Get('user')
  @Roles('USER')
  findAllUser() {
    return 'This route is restricted to users role.';
  }
}
