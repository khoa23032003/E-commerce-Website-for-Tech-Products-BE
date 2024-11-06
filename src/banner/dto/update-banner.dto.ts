import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-banner.dto';
import { IsOptional } from 'class-validator';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @ApiProperty({ description: 'The name of the candidate' })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: "The candidate's CV file (file format)",
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: "The candidate's CV file (file format)",
    type: 'string',
    format: 'binary',
  })
  link?: string;
}
