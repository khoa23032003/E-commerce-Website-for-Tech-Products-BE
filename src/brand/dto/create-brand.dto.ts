import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {

    @ApiProperty({ description: 'The name of the brand', required: true })
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên phải là chuỗi ký tự' })
    name: string;

}
