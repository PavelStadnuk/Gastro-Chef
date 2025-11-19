import api from './axios.js';

const uniqueId=Math.random().toString(36).slice(2);
export const addToCart = async (params) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: uniqueId,
    method: 'addToCart',
    params,
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};


export const getCart = async (clientId) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: uniqueId,
    method: 'getCart',
    params: { clientId },
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};


export const updateQuantity = async (clientId, productId, quantity) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: uniqueId,
    method: 'updateQuantity',
    params: { clientId, productId, quantity },
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};


export const clearCart = async (clientId) => {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: uniqueId,
    method: 'clearCart',
    params: { clientId },
  });
  if (response.data.error) throw new Error(response.data.error.message);
  return response.data.result;
};
