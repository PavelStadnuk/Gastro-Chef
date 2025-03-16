import { ResultSetHeader } from 'mysql2'
import db from '../config/db'
import {
	validateCreateOrder,
	validateUpdateOrderStatus,
} from '../schemas/order.schema'
import { OrderParams } from '../types/order.interface'
class OrderController {
	async createOrder(params: OrderParams) {
		try {
			if (!validateCreateOrder(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateOrder.errors,
				}
			}
			const { user_id, total_price, status } = params
			const [result] = await db.execute<ResultSetHeader>(
				'INSERT INTO orders (user_id, total_price,STATUS) VALUES (?, ?, ?)',
				[user_id, total_price, status]
			)
		} catch (error) {
			console.error('❌ Error creating user:', error)
			throw new Error('Database error')
		}
	}
	async getOrdersByUserId(params: { user_id: number }) {
		try {
			const [orders] = await db.query(
				'SELECT * FROM orders WHERE user_id = ?',
				[params.user_id]
			)
			return orders
		} catch (error) {
			console.error('❌ Error getting orders:', error)
			throw new Error('Database error')
		}
	}
	async updateOrderStatus(params: { order_id: number; status: string }) {
		const { order_id, status } = params
		try {
			if (!validateUpdateOrderStatus(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateOrder.errors,
				}
			}
			const [result] = await db.execute<ResultSetHeader>(
				'UPDATE orders SET STATUS = ? WHERE id = ?',
				[status, order_id]
			)
		} catch (error) {
			console.error('❌ Error updating order:', error)
			throw new Error('Database error')
		}
	}
	async deleteOrder(params: { order_id: number }) {
		try {
			const [result] = await db.execute<ResultSetHeader>(
				'DELETE FROM orders WHERE id = ?',
				[params.order_id]
			)
		} catch (error) {
			console.error('❌ Error deleting order:', error)
			throw new Error('Database error')
		}
	}
}
export default new OrderController()
