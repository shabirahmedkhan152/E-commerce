// src/context/AdminContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if admin is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
      fetchOrders();
      fetchProducts();
    }
  }, []);

  // Admin Login
  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      if (email === 'admin@khanclothing.pk' && password === 'Admin@123') {
        const token = 'admin-jwt-token-' + Date.now();
        localStorage.setItem('adminToken', token);
        setIsAdminLoggedIn(true);
        
        await fetchOrders();
        await fetchProducts();
        
        return { success: true };
      } else {
        return { success: false, message: 'Invalid admin credentials' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, message: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Admin Logout
  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    setOrders([]);
  };

  // Fetch Orders from backend
  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders');
      setOrders(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  // Update Order Status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.patch(`/api/orders/${orderId}`, { status: newStatus });
      const updated = response.data;
      setOrders(prev => prev.map(order =>
        order.orderId === orderId ? updated : order
      ));
      return updated;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      // Map Mongoose _id to id for UI
      const mapped = response.data.map(p => ({ ...p, id: p._id }));
      setProducts(mapped);
      return mapped;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Add New Product (saved in backend)
  const addProduct = async (productData) => {
    try {
      const response = await api.post('/api/products', productData);
      const savedProduct = { ...response.data, id: response.data._id };
      setProducts(prev => [savedProduct, ...prev]);
      return { success: true, product: savedProduct };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, message: 'Failed to add product' };
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/api/products/${productId}`);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  // Update Product
  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await api.put(`/api/products/${productId}`, updatedData);
      const updatedProduct = { ...response.data, id: response.data._id };
      setProducts(prev => prev.map(p => (p.id === productId ? updatedProduct : p)));
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{
      isAdminLoggedIn,
      adminLogin,
      adminLogout,
      loading,
      orders,
      products,
      updateOrderStatus,
      addProduct,
      deleteProduct,
      updateProduct,
      fetchProducts
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}