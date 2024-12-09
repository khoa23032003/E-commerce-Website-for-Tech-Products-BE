import { PartialType } from '@nestjs/swagger';
import { CreatePolicyDto } from './create-policy.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {

    @ApiProperty({
        description: 'The title of the policy (optional)',
        example: 'Updated Policy Title',
        required: false, // Trường này là tùy chọn
    })
    @IsString({ message: 'Title must be a string' })
    title?: string; // Optional due to PartialType

    @ApiProperty({
        description: 'The content of the policy (optional)',
        example: 'This is the updated content for the policy.',
        required: false, // Trường này là tùy chọn
    })
    @IsString({ message: 'Content must be a string' })
    content?: string; // Optional due to PartialType
}
