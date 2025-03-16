import productController from '../controllers/product.controller'
import { product, productUpdate } from '../types/product.interface'
const product = {
	async createProduct(params: product) {
		return await productController.createProduct(params)
	},
	async updateProduct(params: productUpdate) {
		return await productController.updateProduct(params)
	},
	async getProduct(params: { id: number }) {
		return await productController.getProductById(params)
	},
	async deleteProduct(params: { id: number }) {
		return await productController.deleteProduct(params)
	},
	async getProducts() {
		return await productController.getProducts()
	},
}

export default product
