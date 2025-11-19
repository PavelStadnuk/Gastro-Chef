import api from './axios.js'; 
const uniqueId=Math.random().toString(36).slice(2);
export const createArticle = async ({ title, slug, content, dateAdd }) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'createArticle',
      params: { title, slug, content, dateAdd },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error creating article:', error.message);
    throw error;
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'getArticleById',
      params: { articleId },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error fetching article:', error.message);
    throw error;
  }
};

export const listArticles = async (page = 1, itemsPerPage = 9) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'listArticles',
      params: { page, itemsPerPage },
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error listing articles:', error.message);
    throw error;
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const response = await api.post('/rpc', {
      jsonrpc: '2.0',
      id: uniqueId,
      method: 'getArticleBySlug',
      params: { slug },
    });

    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    const msg = error?.message || JSON.stringify(error);
    console.error('Error fetching article by slug:', msg);
    throw error;
  }
};
