import api from './axios.js';

const uniqueId=Math.random().toString(36).slice(2);
export const createOrder = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const getOrderById = async (orderId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const getOrdersByClientId = async (clientId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const deleteOrder = async (orderId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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
