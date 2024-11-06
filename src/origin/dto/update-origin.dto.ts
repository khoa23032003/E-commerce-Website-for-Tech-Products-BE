import { IsOptional, IsString } from 'class-validator';

export class UpdateOriginDto {
  @IsOptional()
  @IsString({ message: 'Tên quốc gia phải là một chuỗi.' })
  country?: string;
}
