import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cartItem.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // thêm giỏ hàng
  @Post('add-item')
  async addItemToCart(@Body() addCartItemDto: AddCartItemDto,@Req() req: Request) {

    const id = req['userId']; 
    return await this.cartService.addCartItem(addCartItemDto,id);
  }
  // xóa 1 sản phẩm trong giỏ hàng
@Delete('delete-item/:id')
  async deleteItemToCart(@Param('id') cartItemId: string) {
    return await this.cartService.deleteCartItem(cartItemId);
  }
  // xóa toàn bộ giỏ hàng
  @Delete('delete-all')
  async deleteAllItemToCart(@Req() req: Request) {
    return await this.cartService.deleteCart(req['userId']);
  }
  // cập nhật giỏ hàng
  @Post('update-item')
  async updateItemToCart(@Body() updateCartItemDto: UpdateCartItemDto) {
    return await this.cartService.updateCartItem(updateCartItemDto.id, updateCartItemDto.quantity);
  }
  // lấy giỏ hàng
  @Get('get-item')
  async getItemToCart(@Req() req: Request) {
    return await this.cartService.getCart(req['userId']);
  }
} 
