import orderController from '../controllers/order.controller'
import { OrderParams, updateOrderStatus } from '../types/order.interface'
const Order = {
	async createOrder(params: OrderParams) {
		return await orderController.createOrder(params)
	},
	async getOrdersByUserId(params: { user_id: number }) {
		return await orderController.getOrdersByUserId(params)
	},
	async updateOrderStatus(params: updateOrderStatus) {
		return await orderController.updateOrderStatus(params)
	},
	async deleteOrder(params: { order_id: number }) {
		return await orderController.deleteOrder(params)
	},
}

export default Order
