import categoryController from '../controllers/category.controller.js';

const category = {
    async createCategory(params) {
        return await categoryController.createCategory(params);
    },
    async getCategoryById(params) {
        return await categoryController.getCategoryById(params);
    },
    async updateCategory(params) {
        return await categoryController.updateCategory(params);
    },
    async deleteCategory(params) {
        return await categoryController.deleteCategory(params);
    },
    async listCategories() {
        return await categoryController.listCategories();
    },
    async getCategoryBySlug(params) {
        return await categoryController.getCategoryBySlug(params);
    },
    async updateCategoryImages(params) {
        return await categoryController.updateCategoryImages(params);
    }
}
export default category;