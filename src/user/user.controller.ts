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
  constructor(private readonly userService: UserService) {}
}
