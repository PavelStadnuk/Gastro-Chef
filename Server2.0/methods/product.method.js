import productController from '../controllers/product.controller.js';

const product = {
    createProduct: async (params) => {
        return await productController.createProduct(params);
    },
    getProductById: async (params) => {
        return await productController.getProductById(params);
    },
    updateProduct: async (params) => {
        return await productController.updateProduct(params);
    },
    deleteProduct: async (params) => {
        return await productController.deleteProduct(params);
    },
    getAllProducts: async () => {
        return await productController.getAllProducts();
    },
    getProductsByCategory: async (params) => {
        return await productController.getProductsByCategory(params);
    },
    updateProductImage: async (params) => {
        return await productController.updateProductImage(params);
    }

}
export default product;