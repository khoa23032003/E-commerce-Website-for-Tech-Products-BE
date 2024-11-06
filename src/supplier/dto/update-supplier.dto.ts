import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Thông tin liên hệ không được để trống' })
  contact?: string;
}
