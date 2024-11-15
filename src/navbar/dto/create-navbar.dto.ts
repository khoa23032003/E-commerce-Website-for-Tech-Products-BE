import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNavbarDto {
  @ApiProperty({ description: 'The name of the navbar category' })
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  name: string;
  @ApiProperty({ description: 'The name of the navbar category' })
  link: string;
}
