import { Injectable } from '@nestjs/common';
import { CreateNavbarDto } from './dto/create-navbar.dto';
import { UpdateNavbarDto } from './dto/update-navbar.dto';

@Injectable()
export class NavbarService {
  create(createNavbarDto: CreateNavbarDto) {
    return 'This action adds a new navbar';
  }

  findAll() {
    return `This action returns all navbar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} navbar`;
  }

  update(id: number, updateNavbarDto: UpdateNavbarDto) {
    return `This action updates a #${id} navbar`;
  }

  remove(id: number) {
    return `This action removes a #${id} navbar`;
  }
}
