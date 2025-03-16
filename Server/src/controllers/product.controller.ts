import { ResultSetHeader } from 'mysql2/promise'
import db from '../config/db'
import {
	validateCreateProduct,
	validateUpdateProduct,
} from '../schemas/product.schema'
import { product, productUpdate } from '../types/product.interface'
class ProductController {
	async createProduct(params: product) {
		try {
			if (!validateCreateProduct(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateProduct.errors,
				}
			}
			const { name, price, stockQuantity, image, description, categoryName } =
				params
			const [result] = await db.execute<ResultSetHeader>(
				'INSERT INTO products (name, price, stock_quantity,image,description,category_name) VALUES (?, ?, ?, ?, ?, ?)',
				[name, price, stockQuantity, image, description, categoryName]
			)
		} catch (error) {
			console.error('❌ Error creating product:', error)
			throw new Error('Database error')
		}
	}
	async getProducts() {
		try {
			const [products] = await db.execute('SELECT * FROM products')
			return products
		} catch (error) {
			console.error('❌ Error fetching products:', error)
			throw new Error('Database error')
		}
	}
	async getProductById(params: { id: number }) {
		try {
			const [product] = await db.execute(
				'SELECT * FROM products WHERE id = ?',
				[params.id]
			)
			return product
		} catch (error) {
			console.error('❌ Error fetching product:', error)
			throw new Error('Database error')
		}
	}
	async updateProduct(params: productUpdate) {
		try {
			if (!validateUpdateProduct(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateUpdateProduct.errors,
				}
			}
			const {
				id,
				name,
				price,
				stockQuantity,
				image,
				description,
				categoryName,
			} = params
			const [result] = await db.execute<ResultSetHeader>(
				'UPDATE products SET name = ?, price = ?, stock_quantity = ?, image = ? WHERE id = ?',
				[name, price, stockQuantity, image, id, description, categoryName]
			)
		} catch (error) {
			console.error('❌ Error updating product:', error)
			throw new Error('Database error')
		}
	}
	async deleteProduct(params: { id: number }) {
		try {
			const [result] = await db.execute<ResultSetHeader>(
				'DELETE FROM products WHERE id = ?',
				[params.id]
			)
		} catch (error) {
			console.error('❌ Error deleting product:', error)
			throw new Error('Database error')
		}
	}
}
export default new ProductController()
