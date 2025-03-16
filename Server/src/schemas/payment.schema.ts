import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)
const createPaymentSchema = {
	type: 'object',
	properties: {
		order_id: { type: 'number' },
		payment_method: { type: 'string', enum: ['card', 'paypal', 'cash'] },
		transaction_id: { type: 'string' },
	},
	required: ['order_id', 'payment_method', 'transaction_id'],
	additionalProperties: false,
}

export const validateCreatePayment = ajv.compile(createPaymentSchema)
