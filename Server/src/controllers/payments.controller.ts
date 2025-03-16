import db from '../config/db'
import { validateCreatePayment } from '../schemas/payment.schema'
import { PaymentParams } from '../types/payments.interface'
class PaymentsController {
	async createPayments(params: PaymentParams) {
		try {
			if (!validateCreatePayment(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreatePayment.errors,
				}
			}
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
	async getPayment(params: { id: number }) {
		try {
			const { id } = params
			const [payment] = await db.query('SELECT * FROM payments WHERE id = ?', [
				id,
			])
			return payment
		} catch (error) {
			console.error('❌ Error getting payment:', error)
			throw new Error('Internal Server Error')
		}
	}
}

export default new PaymentsController()
