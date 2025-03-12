const db = require('../config/db')
class OrderController {
	async createOrder(params) {
		const client = await db.getConnection()
		try {
			await client.beginTransaction()
			const totalPrice = params.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			)
			await client.query(
				'INSERT INTO orders (user_id, total_price,status) VALUES (?, ?,pending)',
				[params.user_id, totalPrice, params.status]
			)
			const [orderIdResult] = await client.query(
				'SELECT LAST_INSERT_ID() AS order_id'
			)
			const orderId = orderIdResult[0].order_id
			// 2️⃣ Додаємо товари у order_items
			const items = params.items
			const values = items.map(() => '(?, ?, ?, ?)').join(', ')
			const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ${values}`
			const queryParams = items.flatMap(item => [
				orderId,
				item.product_id,
				item.quantity,
				item.price,
			])

			await client.query(query, queryParams)

			await client.commit() // Завершуємо транзакцію

			return { message: 'Order created', order_id: orderId }
		} catch (err) {
			await client.rollback()
			throw err
		} finally {
			client.release()
		}
	}
}
module.exports = new OrderController()
