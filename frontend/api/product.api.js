import api from './axios.js'; 


export const createProduct = async ({ name, price, categoryId, image, Composition, Proteins, Fats, Carbohydrates, Calories }) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'createProduct',
      params: { name, price, categoryId, image, Composition, Proteins, Fats, Carbohydrates, Calories },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error creating product:', error.message);
    throw error;
  }
};


export const getProductById = async (productId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getProductById',
      params: { productId },
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    throw error;
  }
};


export const listProducts = async (page = 1, itemsPerPage = 20) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'listProducts',
      params: { page, itemsPerPage },
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error listing products:', error.message);
    throw error;
  }
};


export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getProductsByCategory',
      params: { categoryId },
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching products by category:', error.message);
    throw error;
  }
};
