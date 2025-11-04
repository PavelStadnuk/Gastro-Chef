import api from './axios.js';

// ➕ Створити orderRaw
export const createOrderRaw = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'createOrderRaw',
      params,
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error creating order raw:', error.message);
    throw error;
  }
};

// 🔄 Оновити orderRaw
export const updateOrderRaw = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'updateOrderRaw',
      params,
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error updating order raw:', error.message);
    throw error;
  }
};

// 🗑 Видалити orderRaw
export const deleteOrderRaw = async (orderRawId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'deleteOrderRaw',
      params: { orderRawId },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error deleting order raw:', error.message);
    throw error;
  }
};

// 🛒 Отримати orderRaw за id
export const getOrderRawById = async (orderRawId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getOrderRawById',
      params: { orderRawId },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error getting order raw by id:', error.message);
    throw error;
  }
};

// 📝 Отримати всі orderRaws по orderId
export const getOrderRawsByOrderId = async (orderId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getOrderRawsByOrderId',
      params: { orderId },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error getting order raws by order id:', error.message);
    throw error;
  }
};
