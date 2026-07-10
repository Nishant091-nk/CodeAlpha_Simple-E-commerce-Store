import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart([]); return; }
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/cart', { productId, quantity });
      setCart(data);
      toast.success('Added to cart!');
      setSidebarOpen(true);
      return true;
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to add to cart');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateItem = useCallback(async (productId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      setCart(data);
    } catch (e) {
      toast.error('Failed to update cart');
    }
  }, []);

  const removeItem = useCallback(async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCart(data);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      await api.delete('/cart');
      setCart([]);
    } catch {}
  }, []);

  const subtotal = cart.reduce((acc, item) => {
    return acc + (item.product?.price || 0) * item.quantity;
  }, 0);

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      sidebarOpen,
      setSidebarOpen,
      addToCart,
      updateItem,
      removeItem,
      clearCart,
      subtotal,
      itemCount,
      fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
