import { IsString } from 'class-validator';

export class CreateNavbarDto {
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  name: string;
}
