const db = require('../config/db')

class PaymentsController {
	async createPayments(params) {
		try {
			const { order_id, payment_method, transaction_id } = params

			const [newPayment] = await db.query(
				'INSERT INTO payments (order_id, payment_method, transaction_id) VALUES (?, ?, ?)',
				[order_id, payment_method, transaction_id]
			)

			console.log('✅ Payment created:', newPayment)
			return { success: true, payment: newPayment }
		} catch (error) {
			console.error('❌ Error creating payment:', error)
			throw new Error('Internal Server Error')
		}
	}
}

module.exports = new PaymentsController()
