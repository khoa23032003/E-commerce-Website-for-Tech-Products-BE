import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Thông tin liên hệ không được để trống' })
  contact: string;
}
