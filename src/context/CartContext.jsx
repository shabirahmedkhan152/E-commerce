// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';
import api from '../api';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Orders state (saved in backend)
  const [orders, setOrders] = useState([]);

  // Update cart and save to localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Add to cart
  const addToCart = (product, selectedSize, quantity = 1) => {
    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity
      };
      updateCart(updatedCart);
    } else {
      const newItem = {
        ...product,
        selectedSize,
        quantity
      };
      updateCart([...cart, newItem]);
    }
  };

  // Place order (saved in backend)
  const placeOrder = async (orderDetails) => {
    const orderId = 'ORD' + Date.now().toString().slice(-6);
    const newOrder = {
      orderId,
      ...orderDetails,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        size: item.selectedSize,
        price: item.price,
        image: item.image
      })),
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    try {
      const response = await api.post('/api/orders', newOrder);
      const savedOrder = response.data;

      // Clear cart on success
      updateCart([]);

      return savedOrder;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  // Get all orders (from backend)
  const getAllOrders = async () => {
    try {
      const response = await api.get('/api/orders');
      setOrders(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  // Update order status (saved in backend)
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.patch(`/api/orders/${orderId}`, { status: newStatus });
      const updatedOrder = response.data;
      setOrders(prev => prev.map(o => (o.orderId === orderId ? updatedOrder : o)));
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  // Update quantity
  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      (item.id === itemId && item.selectedSize === size)
        ? { ...item, quantity: newQuantity }
        : item
    );
    updateCart(updatedCart);
  };

  // Remove from cart
  const removeFromCart = (itemId, size) => {
    const updatedCart = cart.filter(
      item => !(item.id === itemId && item.selectedSize === size)
    );
    updateCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    updateCart([]);
  };

  // Calculate total items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      orders,
      addToCart, 
      clearCart,
      updateQuantity,
      removeFromCart,
      getTotalItems,
      getTotalPrice,
      placeOrder,        // <-- NEW: Place order function
      getAllOrders,       // <-- NEW: Get all orders
      updateOrderStatus   // <-- NEW: Update order status
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}