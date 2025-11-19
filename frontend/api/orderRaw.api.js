import api from './axios.js';

const uniqueId=Math.random().toString(36).slice(2);
export const createOrderRaw = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const updateOrderRaw = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const deleteOrderRaw = async (orderRawId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const getOrderRawById = async (orderRawId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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


export const getOrderRawsByOrderId = async (orderId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
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
