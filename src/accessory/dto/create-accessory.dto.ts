import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUrl, Min } from 'class-validator';

export class CreateAccessoryDto {
  @ApiProperty({ description: 'The name of the accessory', required: true })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name: string;

  @ApiProperty({ description: 'The description of the accessory', required: true })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description: string;

  @ApiProperty({ description: 'The price of the accessory', required: true })
  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsNumber({}, { message: 'Giá phải là một số' })
  @Min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' })
  price: number;

  @ApiProperty({ description: 'The image URL of the accessory', required: true })
  @IsNotEmpty({ message: 'URL hình ảnh không được để trống' })
  @IsUrl({}, { message: 'URL hình ảnh không hợp lệ' })
  imageUrl: string;

  @ApiProperty({ description: 'The stock quantity of the accessory', required: true })
  @IsNotEmpty({ message: 'Tồn kho không được để trống' })
  @IsNumber({}, { message: 'Tồn kho phải là một số' })
  @Min(0, { message: 'Tồn kho phải lớn hơn hoặc bằng 0' })
  stock: number;
}
