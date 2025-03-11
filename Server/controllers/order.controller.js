const db = require('../config/db')
class OrderController {
	async createOrder(req, res) {
		const {
			user_id,
			total_price,
			STATUS,
			order_id,
			product_id,
			quantity,
			price,
		} = req.body
		const newOrder = await db.query(
			'INSERT INTO orders (user_id, total_price, STATUS) values ($1, $2, $3) RETURNING *',
			[user_id, total_price, STATUS]
		)
		const orderItems = await db.query(
			'INSERT INTO order_items (order_id, product_id, quantity, price) values ($1, $2, $3,$4) RETURNING *',
			[order_id, product_id, quantity, price]
		)
		res.json(newOrder.rows[0])
		res.json(orderItems.rows[0])
		console.log('OrderItems created:', orderItems.rows[0])
		console.log('Order created:', newOrder.rows[0])
	}
	async allOrders(req, res) {
		const id = req.params.id
		const orders = await db.query('SELECT * FROM orders where user_id=$1', [id])
		res.json(orders.rows)
		console.log('Orders:', orders.rows)
	}
}
module.exports = new OrderController()
