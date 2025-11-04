import db from '../config/db.js';
import {
    validateCreateProduct,
    validateUpdateProduct,
} from '../schemas/product.schema.js';
class ProductsController {
    async createProduct(params) {
        if (!validateCreateProduct(params)) {
            return {
                error: -21212,
                message: 'Invalid request data',
                details: validateCreateProduct.errors,
            };
        }
        const {
            name,
            price,
            weight,
            description,
            categoryId,
            providerId,
            Composition,
            Proteins,
            Fats,
            Carbohydrates,
            Calories,
            imagePath,
        } = params;
        const [result] = await db.execute(
            'INSERT INTO products (name, price, weight, description, categoryId, providerId,Composition,Proteins,Fats,Carbohydrates,Calories,imagePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                name,
                price,
                weight,
                description,
                categoryId,
                providerId,
                Composition,
                Proteins,
                Fats,
                Carbohydrates,
                Calories,
                imagePath,
            ]
        );
        return {
            id: result.insertId,
            name,
            price,
            weight,
            description,
            categoryId,
            providerId,
            Composition,
            Proteins,
            Fats,
            Carbohydrates,
            Calories,
            imagePath,
        };
    }
    async getProductById(params) {
        const { id } = params;
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [
            id,
        ]);
        return rows[0];
    }
    async updateProduct(params) {
        if (!validateUpdateProduct(params)) {
            return {
                error: -21212,
                message: 'Invalid request data',
                details: validateUpdateProduct.errors,
            };
        }
        const { id, name, price, weight, description, categoryId, providerId } =
            params;
        await db.execute(
            'UPDATE products SET name = ?, price = ?, weight = ?, description = ?, categoryId = ?, providerId = ? WHERE id = ?',
            [name, price, weight, description, categoryId, providerId, id]
        );
        return { id, name, price, weight, description, categoryId, providerId };
    }
    async deleteProduct(params) {
        const { id } = params;
        await db.execute('DELETE FROM products WHERE id = ?', [id]);
        return { message: 'Product deleted successfully' };
    }
    async getAllProducts() {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows;
    }
    async getProductsByCategory(params) {
        const { categoryId } = params;
        const [rows] = await db.execute(
            'SELECT * FROM products WHERE categoryId = ?',
            [categoryId]
        );
        return rows;
    }
    async updateProductImage(params) {
        let { productId, imagePath } = params;

        if (!productId || !imagePath) {
            return {
                error: -21212,
                message: 'Missing required fields: id or imagePath',
            };
        }
         imagePath = imagePath.replace(/\\/g, '/');
        await db.execute('UPDATE products SET imagePath = ? WHERE productId = ?', [
            imagePath,
            productId,
        ]);

        return { productId, imagePath };
    }
}
export default new ProductsController();
