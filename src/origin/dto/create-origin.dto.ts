import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOriginDto {
  @IsNotEmpty({ message: 'Tên quốc gia không được để trống.' })
  @IsString({ message: 'Tên quốc gia phải là một chuỗi.' })
  country: string;
}
