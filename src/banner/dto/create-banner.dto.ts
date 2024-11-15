import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
    @ApiProperty({ description: 'The name of the candidate' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: "The candidate's CV file (file format)",
        type: 'string',
        format: 'binary',
    })
    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @ApiProperty({ description: 'The link associated with the candidate' })
    @IsOptional()
    @IsUrl({}, { message: 'Link must be a valid URL' })
    link?: string;
}
