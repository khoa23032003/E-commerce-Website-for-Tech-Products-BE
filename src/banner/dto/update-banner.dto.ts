import { PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-banner.dto';
import { IsOptional } from 'class-validator';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
    @IsOptional()
    title: string

    @IsOptional()
    imageUrl: string


    link?: string
}
