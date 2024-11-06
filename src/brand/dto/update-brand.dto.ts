import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {

    @ApiProperty({ description: 'The name of the brand', required: false })
    @IsOptional()
    @IsString({ message: 'Tên phải là chuỗi ký tự' })
    name?: string; // Marked as optional here as PartialType makes it optional by default

}
