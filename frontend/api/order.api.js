import api from './axios.js';

// ➕ Створити замовлення
export const createOrder = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'createOrder',
      params,
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw error;
  }
};

// 🛒 Отримати замовлення за ID
export const getOrderById = async (orderId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getOrderById',
      params: { orderId },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error getting order by ID:', error.message);
    throw error;
  }
};

// 🧾 Отримати всі замовлення користувача
export const getOrdersByClientId = async (clientId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getOrdersByClientId',
      params: { clientId },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error getting orders by clientId:', error.message);
    throw error;
  }
};

// ❌ Видалити замовлення
export const deleteOrder = async (orderId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'deleteOrder',
      params: { orderId },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error deleting order:', error.message);
    throw error;
  }
};
