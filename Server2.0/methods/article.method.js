import articleController from '../controllers/article.controller.js';
const article = {
    async createArticle(params) {
        return await articleController.createArticle(params);
    },  
    async getArticleById(params) {
        return await articleController.getArticleById(params);
    },
    async updateArticle(params) {
        return await articleController.updateArticle(params);
    },
    async deleteArticle(params) {
        return await articleController.deleteArticle(params);
    },
    async listArticles(params) {
        return await articleController.listArticles(params);
    },
    async getArticleBySlug(params) {
        return await articleController.getArticleBySlug(params);
    }
}
export default article;