import { ResultSetHeader } from 'mysql2'
import db from '../config/db'
import {
	validateCreateOrderItems,
	validateUpdateOrderItems,
} from '../schemas/order_items.schema'
import { OrderItems } from '../types/order_items.interface'

class orderItemsController {
	async createOrderItem(params: OrderItems) {
		try {
			if (!validateCreateOrderItems(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateOrderItems.errors,
				}
			}
			const { orderId, productId, quantity, price } = params
			const [result] = await db.execute<ResultSetHeader>(
				'INSERT INTO orders_item (order_id, products_id, quantity, price) VALUES (?, ?, ?, ?)',
				[orderId, productId, quantity, price]
			)
		} catch (error) {
			console.error('❌ Error creating order item:', error)
			throw new Error('Database error')
		}
	}
	async updateOrderItem(params: OrderItems) {
		try {
			if (!validateUpdateOrderItems(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateOrderItems.errors,
				}
			}
			const { orderId, productId, quantity, price } = params
			const [result] = await db.execute<ResultSetHeader>(
				'UPDATE order_items SET order_id = ?, product_id = ?, quantity = ?, price = ? WHERE id = ?',
				[orderId, productId, quantity, price]
			)
		} catch (error) {
			console.error('❌ Error updating order item:', error)
			throw new Error('Database error')
		}
	}
	async getOrderItem(params: { id: number }) {
		try {
			const { id } = params
			const [result] = await db.execute<ResultSetHeader>(
				'SELECT * FROM order_items WHERE id = ?',
				[id]
			)
		} catch (error) {
			console.error('❌ Error getting order item:', error)
			throw new Error('Database error')
		}
	}
	async deleteOrderItem(params: { id: number }) {
		try {
			const { id } = params
			const [result] = await db.execute<ResultSetHeader>(
				'DELETE FROM order_items WHERE id = ?',
				[id]
			)
		} catch (error) {
			console.error('❌ Error deleting order item:', error)
			throw new Error('Database error')
		}
	}
	async getOrderItems(params: { orderId: number }) {
		try {
			const { orderId } = params
			const [result] = await db.execute<ResultSetHeader>(
				'SELECT * FROM order_items WHERE order_id = ?',
				[orderId]
			)
		} catch (error) {
			console.error('❌ Error getting order items:', error)
			throw new Error('Database error')
		}
	}
}
export default new orderItemsController()
