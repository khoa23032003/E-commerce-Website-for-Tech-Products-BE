import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSupplierDto {
  @ApiProperty({ description: 'The name of the supplier', required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
  @IsString({ message: 'Tên nhà cung cấp phải là chuỗi' })
  name?: string;

  @ApiProperty({ description: 'The contact information of the supplier', required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Thông tin liên hệ không được để trống' })
  @IsString({ message: 'Thông tin liên hệ phải là chuỗi' })
  contact?: string;
}
