import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyDto {
    @ApiProperty({
        description: 'The title of the policy',
        example: 'New Policy Title',
        required: true, // Trường này là bắt buộc
    })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @ApiProperty({
        description: 'The content of the policy',
        example: 'This is the content of the new policy.',
        required: true, // Trường này là bắt buộc
    })
    @IsString({ message: 'Content must be a string' })
    content: string;
}
