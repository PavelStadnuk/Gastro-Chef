import orderController from '../controllers/order.controller'
import { OrderParams } from '../types/order.interface'
const Order = {
	async createOrder(params: OrderParams) {
		return await orderController.createOrder(params)
	},
}

export default Order
