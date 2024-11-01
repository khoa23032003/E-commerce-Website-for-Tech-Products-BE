import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
