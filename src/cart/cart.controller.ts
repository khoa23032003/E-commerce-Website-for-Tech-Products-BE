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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Lấy thông tin giỏ hàng của người dùng
  @Get()
  getCart(@Req() req: any) {
    return this.cartService.getCart(req.user.userId);
  }

  // Thêm sản phẩm vào giỏ hàng
  @Post('add')
  addToCart(@Req() req: any, @Body() createCartItemDto: CreateCartItemDto) {
    return this.cartService.addToCart(req.user.userId, createCartItemDto);
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  @Patch(':id')
  updateCartItem(
    @Param('id') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(cartItemId, updateCartItemDto);
  }

  // Xóa sản phẩm khỏi giỏ hàng
  @Delete(':id')
  removeCartItem(@Param('id') cartItemId: string) {
    return this.cartService.removeCartItem(cartItemId);
  }
}
