import api from './axios.js';

// ➕ Створити користувача
export const createUser = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
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

// ✏️ Оновити користувача
export const updateUser = async (params) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
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

// 🧑‍💻 Отримати користувача за ID
export const getUser = async (id) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
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

// ❌ Видалити користувача
export const deleteUser = async (id) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
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
