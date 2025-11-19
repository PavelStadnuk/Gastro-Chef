import api from './axios.js';

const uniqueId=Math.random().toString(36).slice(2);

export const createCategory = async ({ name, description, slug }) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'createCategory',
      params: { name, description, slug },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error creating category:', error.message);
    throw error;
  }
};


export const getCategoryById = async (categoryId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'getCategoryById',
      params: { categoryId },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error fetching category:', error.message);
    throw error;
  }
};


export const listCategories = async () => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'listCategories',
      params: {},
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error listing categories:', error.message);
    throw error;
  }
};


export const getCategoryBySlug = async (slug) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'getCategoryBySlug',
      params: { slug },
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    const msg = error?.message || JSON.stringify(error);
    console.error('Error fetching category by slug:', msg);
    throw error;
  }
};
