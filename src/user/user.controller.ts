import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Sử dụng JwtAuthGuard cho bảo vệ endpoint
import { Request, Response } from 'express';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }


  //Đăng ký tài khoản
  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  // @Post('login')
  // async login(@Body() loginDto: LoginUserDto) {

  //   const token = await this.userService.login(loginDto);
  //   return {
  //     message: 'Đăng nhập thành công',
  //     accessToken: token,
  //   };

  // }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
