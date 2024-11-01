import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePolicyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;
}
