import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
