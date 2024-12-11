import { ApiProperty } from '@nestjs/swagger';

// Data to update a cart item
export class UpdateCartItemDto {
  @ApiProperty({ description: 'Product ID' })
  id?: string;

  @ApiProperty({ description: 'Quantity of the product' })
  quantity?: number;
}
