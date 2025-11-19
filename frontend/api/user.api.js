import api from './axios.js';

const uniqueId=Math.random().toString(36).slice(2);
export const createUser = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'createUser',
      params,
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};


export const updateUser = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'updateUser',
      params,
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};


export const getUser = async (id) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'getUser',
      params: { id },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error getting user:', error.message);
    throw error;
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'deleteUser',
      params: { id },
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};
