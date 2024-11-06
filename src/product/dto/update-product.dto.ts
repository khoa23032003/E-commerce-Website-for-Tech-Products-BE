import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'The name of the product', required: false })
  name?: string;

  @ApiProperty({
    description: 'The description of the product',
    required: false,
  })
  description?: string;

  @ApiProperty({ description: 'The price of the product', required: false })
  price?: number;

  @ApiProperty({
    description: 'The category ID of the product',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'The stock quantity of the product',
    required: false,
  })
  stock?: number;
}
