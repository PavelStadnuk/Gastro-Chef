const db = require('../config/db')
class ProductsController {
	async createOrder(req, res) {
		const { order_id, product_id, quantity, price } = req.body
		const orderItems = await db.query(
			'INSERT INTO order_items (order_id, product_id, quantity,price) values ($1, $2, $3,$4) RETURNING *',
			[order_id, product_id, quantity, price]
		)

		res.json(orderItems.rows[0])
		console.log('OrderItems created:', orderItems.rows[0])
	}
}
module.exports = new ProductsController()
