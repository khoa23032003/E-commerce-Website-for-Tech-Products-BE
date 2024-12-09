import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
// @UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  // Get user cart information
  @ApiOperation({ summary: 'Get cart information of the user' })
  @ApiResponse({
    status: 200,
    description: 'Cart details fetched successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  getCart(@Req() req: any) {
    return this.cartService.getCart(req.user.userId);
  }

  // Add product to the cart
  @ApiOperation({ summary: 'Add a product to the cart' })
  @ApiResponse({
    status: 201,
    description: 'Product added to cart successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('add')
  addToCart(@Req() req: any, @Body() createCartItemDto: CreateCartItemDto) {
    return this.cartService.addToCart(req.user.userId, createCartItemDto);
  }

  // Update the quantity of a product in the cart
  @ApiOperation({ summary: 'Update quantity of a cart item' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Patch(':id')
  updateCartItem(
    @Param('id') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(cartItemId, updateCartItemDto);
  }

  // Remove product from the cart
  @ApiOperation({ summary: 'Remove a product from the cart' })
  @ApiResponse({
    status: 200,
    description: 'Product removed from cart successfully',
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Delete(':id')
  removeCartItem(@Param('id') cartItemId: string) {
    return this.cartService.removeCartItem(cartItemId);
  }
}
