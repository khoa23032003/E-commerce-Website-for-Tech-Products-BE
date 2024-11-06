import { PartialType } from '@nestjs/swagger';
import { CreatePolicyDto } from './create-policy.dto';

import { IsOptional, IsString } from 'class-validator';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {

    @IsString()
    @IsOptional()
    title: string


    @IsString()
    @IsOptional()
    content: string
}

