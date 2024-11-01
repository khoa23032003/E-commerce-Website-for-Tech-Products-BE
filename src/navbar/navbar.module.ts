import { Module } from '@nestjs/common';
import { NavbarService } from './navbar.service';
import { NavbarController } from './navbar.controller';

@Module({
  controllers: [NavbarController],
  providers: [NavbarService],
})
export class NavbarModule {}
