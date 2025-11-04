import api from './axios.js';

// ➕ Додати в кошик
export const addToCart = async (params) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'addToCart',
    params,
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};

// 🛒 Отримати кошик
export const getCart = async (clientId) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'getCart',
    params: { clientId },
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};

// 🔁 Оновити кількість
export const updateQuantity = async (clientId, productId, quantity) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'updateQuantity',
    params: { clientId, productId, quantity },
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};

// ❌ Очистити кошик
export const clearCart = async (clientId) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'clearCart',
    params: { clientId },
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};
