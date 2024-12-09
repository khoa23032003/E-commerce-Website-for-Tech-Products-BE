import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateAccessoryDto {
  @ApiProperty({ description: 'The name of the accessory', required: false })
  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name?: string;

  @ApiProperty({ description: 'The description of the accessory', required: false })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description?: string;

  @ApiProperty({ description: 'The price of the accessory', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Giá phải là một số' })
  @Min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' })
  price?: number;

  @ApiProperty({
    description: 'The image file for the accessory (optional)',
    type: 'string',
    format: 'binary', // Specify binary for file upload
    required: false,
  })
  @IsOptional()
  imageUrl?: string; // Note: This represents the uploaded file, not the URL.

  @ApiProperty({ description: 'The stock quantity of the accessory', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Tồn kho phải là một số' })
  @Min(0, { message: 'Tồn kho phải lớn hơn hoặc bằng 0' })
  stock?: number;
}
