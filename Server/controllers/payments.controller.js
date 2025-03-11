const db = require('../config/db')
class PaymentsController {
	async createPayments(req, res) {
		const { order_id, payment_method, transaction_id } = req.body
		const newPayment = await db.query(
			'INSERT INTO payments (order_id, payment_method, transaction_id) values ($1, $2, $3) RETURNING *',
			[order_id, payment_method, transaction_id]
		)
		res.json(newPayment.rows[0])
		onsole.log('Payment created:', newPayment.rows[0])
	}
}
module.exports = new PaymentsController()
