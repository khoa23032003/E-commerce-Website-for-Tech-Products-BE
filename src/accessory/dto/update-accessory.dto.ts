import { IsOptional, IsString, IsNumber, IsUrl, Min } from 'class-validator';

export class UpdateAccessoryDto {
  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Giá phải là một số' })
  @Min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' })
  price?: number;

  @IsOptional()
  @IsUrl({}, { message: 'URL hình ảnh phải hợp lệ' })
  imageUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Tồn kho phải là một số' })
  @Min(0, { message: 'Tồn kho phải lớn hơn hoặc bằng 0' })
  stock?: number;
}
