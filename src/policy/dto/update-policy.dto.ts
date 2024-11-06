import { PartialType } from '@nestjs/swagger';
import { CreatePolicyDto } from './create-policy.dto';
import { IsString } from 'class-validator';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {

    @IsString({ message: 'Title must be a string' })
    title?: string; // Optional due to PartialType

    @IsString({ message: 'Content must be a string' })
    content?: string; // Optional due to PartialType
}
