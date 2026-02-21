import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add session ID to cart requests
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.url.startsWith('/cart')) {
    config.headers['X-Session-Id'] = getSessionId();
  }
  return config;
});

// Products
export const getProducts = () => api.get('/products');
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const getFeaturedProducts = () => api.get('/products/featured');
export const getProductsByCategory = (categorySlug) => api.get(`/products/category/${categorySlug}`);

// Categories
export const getCategories = () => api.get('/categories');
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity = 1) => api.post('/cart/items', { productId, quantity });
export const updateCartItem = (itemId, quantity) => api.put(`/cart/items/${itemId}?quantity=${quantity}`);
export const removeCartItem = (itemId) => api.delete(`/cart/items/${itemId}`);
export const clearCart = () => api.delete('/cart');

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (data) => api.post('/auth/register', data);

// Search
export const searchProducts = (query) => api.get(`/search?q=${encodeURIComponent(query)}`);

// Newsletter
export const subscribeNewsletter = (email) => api.post('/newsletter', { email });

// Contact
export const submitContact = (data) => api.post('/contact', data);

export default api;
