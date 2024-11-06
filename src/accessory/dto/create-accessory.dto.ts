import { IsNotEmpty, IsString, IsNumber, IsUrl, Min } from 'class-validator';

export class CreateAccessoryDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description: string;

  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsNumber({}, { message: 'Giá phải là một số' })
  @Min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' })
  price: number;

  @IsNotEmpty({ message: 'URL hình ảnh không được để trống' })
  imageUrl: string;

  @IsNotEmpty({ message: 'Tồn kho không được để trống' })
  @IsNumber({}, { message: 'Tồn kho phải là một số' })
  @Min(0, { message: 'Tồn kho phải lớn hơn hoặc bằng 0' })
  stock: number;
}
