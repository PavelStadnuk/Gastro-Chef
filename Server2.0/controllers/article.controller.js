import db from '../config/db.js';
import {
    validateCreateArticle,
    validateUpdateArticle,
} from '../schemas/arcticle.schema.js';
class ArticleController {
    async createArticle(params) {
        try {
            if (!validateCreateArticle(params)) {
                return {
                    code: -32602,
                    error: 'Invalid parameters',
                    details: validateCreateArticle.errors,
                };
            }
            const { title, content, dateAdd, slug } = params;
            const [result] = await db.execute(
                'INSERT INTO article (title, content, dateAdd, slug) VALUES (?, ?, ?, ?)',
                [title, content, dateAdd, slug]
            );
            return { id: result.insertId, title, content, dateAdd, slug };
        } catch (error) {
            throw new Error('Error creating article: ' + error.message);
        }
    }
    async getArticleById(params) {
        try {
            const { id } = params;
            const [rows] = await db.execute(
                'SELECT * FROM article WHERE articleId = ?',
                [id]
            );
            if (rows.length === 0) {
                throw new Error('Article not found');
            }
            return rows[0];
        } catch (error) {
            throw new Error('Error retrieving article: ' + error.message);
        }
    }
    async updateArticle(params) {
        try {
            if (!validateUpdateArticle(params)) {
                return {
                    code: -32602,
                    error: 'Invalid parameters',
                    details: validateUpdateArticle.errors,
                };
            }
            const { id, title, content } = params;
            const [result] = await db.execute(
                'UPDATE article SET title = ?, content = ? WHERE id = ?',
                [title, content, id]
            );
            if (result.affectedRows === 0) {
                throw new Error('Article not found or no changes made');
            }
            return { id, title, content };
        } catch (error) {
            throw new Error('Error updating article: ' + error.message);
        }
    }
    async deleteArticle(params) {
        try {
            const { id } = params;
            const [result] = await db.execute(
                'DELETE FROM article WHERE articleId = ?',
                [id]
            );
            if (result.affectedRows === 0) {
                throw new Error('Article not found');
            }
            return { message: 'Article deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting article: ' + error.message);
        }
    }
    async listArticles(params) {
        try {
            const data = params || {};
            const page = Number(data.page) || 1;
            const itemsPerPage = Number(data.itemsPerPage) || 9;
            const offset = (page - 1) * itemsPerPage;

            console.log('Listing articles -', { page, itemsPerPage, offset });
            console.log(typeof itemsPerPage, typeof offset);

            const [rows] = await db.query(
                'SELECT * FROM article ORDER BY dateAdd DESC LIMIT ? OFFSET ?',
                [itemsPerPage, offset]
            );

            const articles = rows.map(article => ({
                ...article,
                dateAdd: article.dateAdd.toISOString().slice(0, 10),
            }));

            const [countResult] = await db.execute(
                'SELECT COUNT(*) as total FROM article'
            );
            const total = countResult[0].total;

            return { articles, total };
        } catch (error) {
            throw new Error('Error listing articles: ' + error.message);
        }
    }

    async getArticleBySlug(params) {
        try {
            const { slug } = params;
            const [rows] = await db.execute(
                'SELECT * FROM article WHERE slug = ?',
                [slug]
            );
            if (rows.length === 0) {
                throw new Error('Article not found');
            }
            return rows[0];
        } catch (error) {
            throw new Error('Error retrieving article: ' + error.message);
        }
    }
}
export default new ArticleController();
