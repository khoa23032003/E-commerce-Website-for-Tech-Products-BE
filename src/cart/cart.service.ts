import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  private prisma = new PrismaClient();

  //lấy thông tin giỏ hàng người đùng
  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Không tìm thấy giỏ hàng.');
    }

    return cart;
  }

  //thêm sản phẩm vào giỏ hàng
  // Thêm sản phẩm vào giỏ hàng
  async addToCart(userId: string, createCartItemDto: CreateCartItemDto) {
    const { productId, quantity } = createCartItemDto;

    // Kiểm tra xem giỏ hàng đã tồn tại chưa, nếu chưa thì tạo mới
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingCartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      return this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    }

    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  async updateCartItem(
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  // Xóa sản phẩm khỏi giỏ hàng
  async removeCartItem(cartItemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
