const paymentsController = require('../controllers/payments.controller')
const payments = {
	async createPayments(params) {
		return await paymentsController.createPayments(params)
	},
}

module.exports = payments
