import paymentsController from '../controllers/payments.controller'
import { PaymentParams } from '../types/payments.interface'
const payments = {
	async createPayments(params: PaymentParams) {
		return await paymentsController.createPayments(params)
	},
}

export default payments
