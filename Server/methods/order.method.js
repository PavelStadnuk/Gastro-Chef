const orderController = require('../controllers/order.controller')

const Order = {
	async createOrder(params) {
		return await orderController.createOrder(params)
	},
}

module.exports = Order
