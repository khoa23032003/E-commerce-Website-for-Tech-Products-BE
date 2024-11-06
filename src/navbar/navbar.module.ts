import { Module } from '@nestjs/common';
import { NavbarService } from './navbar.service';
import { NavbarController } from './navbar.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [NavbarController],
  providers: [NavbarService, PrismaClient],
})
export class NavbarModule {}
