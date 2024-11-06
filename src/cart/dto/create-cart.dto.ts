import { ApiProperty } from '@nestjs/swagger';

// Data to create a cart item
export class CreateCartItemDto {
  @ApiProperty({ description: 'Product ID' })
  productId: string;

  @ApiProperty({ description: 'Quantity of the product' })
  quantity: number;
}
