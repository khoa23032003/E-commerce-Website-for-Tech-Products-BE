import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const API_BASE_URL = 'http://localhost:8080/cart';
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy giỏ hàng từ API
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}`, {
        headers: { Authorization: `Bearer YOUR_JWT_TOKEN` }, // Thay YOUR_JWT_TOKEN bằng token thực tế
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/add`,
        { productId: product.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
        },
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Cập nhật số lượng sản phẩm
  const updateCartItem = async (cartItemId, quantity) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/${cartItemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
        },
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${cartItemId}`, {
        headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  // Gọi API để lấy giỏ hàng khi khởi động
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
