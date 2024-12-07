import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePolicyDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsString({ message: 'Content must be a string' })
    content: string;
}
