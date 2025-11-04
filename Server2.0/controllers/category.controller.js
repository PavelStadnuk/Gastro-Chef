import db from '../config/db.js';
import {
    validateCreateCategory,
    validateUpdateCategory,
} from '../schemas/category.schema.js';

class CategoryController {

    async createCategory(params) {
        try {
            if (!validateCreateCategory(params)) {
                return {
                    code: -32602,
                    message: 'Invalid params',
                    errors: validateCreateCategory.errors,
                };
            }
            const { name, description,slug,mainImage,image} = params;
            const [result] = await db.execute(
                'INSERT INTO category (name, description, slug,mainImage,image) VALUES (?, ?,?,?,?)',
                [name, description ,slug,mainImage,image]
            );
            return { categoryId: result.insertId };
        } catch (error) {
            console.error('❌ Error creating category:', error);
            throw new Error('Database error');
        }
    }

    async getCategoryById(params) {
        try {
            const { categoryId } = params;
            const [rows] = await db.execute(
                'SELECT * FROM category WHERE categoryId = ?',
                [categoryId]
            );
            if (rows.length === 0) {
                throw new Error('Category not found');
            }
            return rows[0];
        } catch (error) {
            console.error('❌ Error getting category:', error);
            throw new Error('Database error');
        }
    }

    async updateCategory(params) {
        try {
            if (!validateUpdateCategory(params)) {
                return {
                    code: -32602,
                    message: 'Invalid params',
                    errors: validateUpdateCategory.errors,
                };
            }
            const { categoryId, name, description } = params;
            const [result] = await db.execute(
                'UPDATE category SET name = ?, description = ? WHERE categoryId = ?',
                [name, description, categoryId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error updating category:', error);
            throw new Error('Database error');
        }
    }

    async deleteCategory(params) {
        try {
            const { categoryId } = params;
            const [result] = await db.execute(
                'DELETE FROM category WHERE categoryId = ?',
                [categoryId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error deleting category:', error);
            throw new Error('Database error');
        }
    }

    async listCategories() {
        try {
            const [rows] = await db.execute('SELECT * FROM category');
            return rows;
        } catch (error) {
            console.error('❌ Error listing categories:', error);
            throw new Error('Database error');
        }
    }
    async getCategoryBySlug(params) {
        try {
            const { slug } = params;
            const [rows] = await db.execute(
                'SELECT * FROM category WHERE slug = ?',
                [slug]
            );
            if (rows.length === 0) {
                throw new Error('Category not found');
            }
            return rows[0];
        } catch (error) {
            console.error('❌ Error getting category by slug:', error);
            throw new Error('Database error');
        }
    }
    async updateCategoryImages(params) {
        try {
            const { categoryId, mainImage, image } = params;
            const [result] = await db.execute(
                'UPDATE category SET mainImage = ?, image = ? WHERE categoryId = ?',
                [mainImage, image, categoryId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error updating category images:', error);
            throw new Error('Database error');
        }

    }
}

export default new CategoryController();
