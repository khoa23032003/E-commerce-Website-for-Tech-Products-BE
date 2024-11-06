import { ApiProperty } from '@nestjs/swagger';

// Data to create a product
export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @ApiProperty({ description: 'The description of the product' })
  description: string;

  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @ApiProperty({ description: 'The category ID of the product' })
  categoryId: string;

  @ApiProperty({
    description: 'The stock quantity of the product',
    required: false,
  })
  stock?: number; // Optional, can provide a default if not passed
}
