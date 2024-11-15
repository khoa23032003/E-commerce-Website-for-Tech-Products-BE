import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNavbarDto } from './create-navbar.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNavbarDto extends PartialType(CreateNavbarDto) {
  @ApiProperty({
    description: 'The name of the navbar category',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  name?: string; // Marked as optional here as PartialType already makes it optional
}
