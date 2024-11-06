import { PartialType } from '@nestjs/swagger';
import { CreateNavbarDto } from './create-navbar.dto';
import { IsOptional } from 'class-validator';

export class UpdateNavbarDto extends PartialType(CreateNavbarDto) {
  @IsOptional()
  name: string;
}
