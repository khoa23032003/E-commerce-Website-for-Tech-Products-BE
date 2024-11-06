import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOriginDto {
  @ApiProperty({ description: 'The name of the Origin' })
  @IsNotEmpty({ message: 'Tên quốc gia không được để trống.' })
  @IsString({ message: 'Tên quốc gia phải là một chuỗi.' })
  country: string;
}
