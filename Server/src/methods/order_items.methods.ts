import orderItemsController from '../controllers/order_items.controller'
import { OrderItems } from '../types/order_items.interface'
const OrderItems = {
	async createOrderItem(params: OrderItems) {
		return await orderItemsController.createOrderItem(params)
	},
	async updateOrderItem(params: OrderItems) {
		return await orderItemsController.updateOrderItem(params)
	},
	async getOrderItem(params: { id: number }) {
		return await orderItemsController.getOrderItem(params)
	},
	async deleteOrderItem(params: { id: number }) {
		return await orderItemsController.deleteOrderItem(params)
	},
	async getOrderItems(params: { orderId: number }) {
		return await orderItemsController.getOrderItems(params)
	},
}

export default OrderItems
