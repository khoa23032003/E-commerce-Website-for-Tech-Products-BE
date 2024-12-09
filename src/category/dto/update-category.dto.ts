import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Tên của danh mục',
    minLength: 3,
    maxLength: 50,
    example: 'Thời trang nam',
  })
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' }) // Không cho phép bỏ trống tên
  @IsString({ message: 'Tên danh mục phải là chuỗi' }) // Danh mục phải là một chuỗi
  @Length(3, 50, { message: 'Tên danh mục phải có từ 3 đến 50 ký tự' }) // Tên danh mục phải có ký tự từ 3 - 50
  name: string;
}
