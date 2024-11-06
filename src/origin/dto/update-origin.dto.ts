import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOriginDto {
  @ApiProperty({ description: 'The name of the Origin' })
  @IsOptional()
  @IsString({ message: 'Tên quốc gia phải là một chuỗi.' })
  country?: string;
}
