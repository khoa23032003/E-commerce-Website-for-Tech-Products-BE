import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: 'The name of the supplier' })
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
  name: string;

  @ApiProperty({ description: 'The contact information of the supplier' })
  @IsNotEmpty({ message: 'Thông tin liên hệ không được để trống' })
  contact: string;
}
