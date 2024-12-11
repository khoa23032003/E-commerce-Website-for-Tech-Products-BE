import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cartItem.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) { }

  // Tạo giỏ hàng mới
  async createCart(userId: string) {
    return this.prisma.cart.create({
      data: { userId },
    });
  }

  // Thêm mục vào giỏ hàng
  async addCartItem(addCartItemDto: AddCartItemDto, userId: string) {
    const { productId, quantity } = addCartItemDto;

    // Tìm giỏ hàng của người dùng
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    // Nếu giỏ hàng không tồn tại, tạo mới
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });

      if (!cart) {
        return {
          success: false,
          message: 'Unable to create cart',
        };
      }
    }
    // tìm giở hàng theo id product
    const cartItemExist = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });
    console.log(cartItemExist)
    if (cartItemExist) {
      // Nếu mục đã tồn tại, cập nhật số lượng
      const cartItemex = await this.prisma.cartItem.update({
        where: { id: cartItemExist.id },
        data: { quantity: cartItemExist.quantity + quantity },
      });
      return {
        success: true,
        message: 'Cart item added successfully',
        data: {
          cart,
          cartItemex,
        },
      }
    }

    // Thêm mục vào giỏ hàng
    const cartItem = await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
    // kiểm tra xem mục đã được thêm vào giỏ hàng chưa
    if (!cartItem) {
      return {
        success: false,
        message: 'Unable to create cart item',
      };
    }
    // trả về thông báo tạo thành công
    return {
      success: true,
      message: 'Cart item added successfully',
      data: {
        cart,
        cartItem,
      },
    };
  }


  // Cập nhật số lượng sản phẩm trong giỏ hàng
  async updateCartItem(id: string, quantity: number) {

    // kiểm tra cartitem theo id
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id },
    });
    // nếu không tìm thấy cartitem thì thông báo không tìm thấy
    if (!cartItem) {
      return {
        success: false,
        message: 'Cart item not found',
      };
    }
    // cập nhật thông tin số lượng sản phẩm giỏ hàng
    const updateCart = await this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
    // kiểm tra số lượng còn lại trong giỏ hàng
    const count = await this.checkQuantity(id);
    // nếu count <=0 thì xóa sản phẩm khỏi giỏ hàng
    if (count <= 0) {
      await this.deleteCartItem(id);
    }
    return {
      success: Boolean(updateCart),
      message: updateCart ? 'Cart item updated' : 'Cart item not found',
      data: updateCart,
    }
  }
  // lấy thông tin itemcart theo id
  async getCartItem(cartItemId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    return {
      success: Boolean(cartItem),
      message: cartItem ? 'Cart item found' : 'Cart item not found',
      data: cartItem,
    }
  }
  // Xóa 1 sản phẩm khỏi giỏ hàng
  async deleteCartItem(cartItemId: string) {

    const exist = await this.getCartItem(cartItemId);
    if (!exist.success) {
      return exist;
    }
    const deleteCart = await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return {
      success: Boolean(deleteCart),
      message: deleteCart ? 'Cart item deleted' : 'Cart item not found',
    };
  }

  //kiểm tra số lượng còn lại trong giỏ hàng
  async checkQuantity(cartItemId: string) {
    const countCart = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    return countCart.quantity;
  }
  // Xem giỏ hàng của người dùng
  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    return {
      success: Boolean(cart),
      message: cart ? 'Cart found' : 'Cart not found',
      data: cart,
    }
  }

  // Xóa hết giỏ hàng
  async deleteCart(userid: string) {
    //lấy cart theo userid
    const cart = await this.prisma.cart.findUnique({
      where: { userId: userid },
    });

    // lấy thông tin cartitem
    const cartItem = await this.prisma.cartItem.findMany({
      where: { cartId: cart.id },
    });

    // nếu tìm thấy thì xóa
    if (!cart) {
      return {
        success: false,
        message: 'Cart not found',
      };
    }

    // xóa cartitem theo id
    const deleteCartItem = await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // nếu tìm thấy thì xóa
    if (!cart) {
      return {
        success: false,
        message: 'Cart not found',
      };
    }
    
    // xóa cart theo id
    const deleteCart = await this.prisma.cart.delete({
      where: { id: cart.id },
    });
  
    return {
      success: Boolean(deleteCart),
      message: deleteCart ? 'Cart deleted' : 'Cart not found',
    }
  }
}
