import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' }) //không cho phép bỏ trống tên
  @IsString({ message: 'Tên danh mục phải là chuỗi' }) //danh mục phải là một chuỗi
  @Length(3, 50, { message: 'Tên danh mục phải có từ 3 đến 50 ký tự' }) //tên danh mục phải có ký tự từ 3 - 50
  // @Matches(/^[a-zA-Z0-9\s]+$/, {
  //   message: 'Tên danh mục không được chứa ký tự đặc biệt',
  // }) // Chỉ cho phép chữ cái, số và khoảng trắng
  name: string;
}
