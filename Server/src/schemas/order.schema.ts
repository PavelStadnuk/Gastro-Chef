import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)
const createOrderSchema = {
	type: 'object',
	properties: {
		user_id: { type: 'number' },
		total_price: { type: 'number' },
		status: {
			type: 'string',
			enum: ['new', 'shipped', 'delivered', 'canceled'],
		},
	},
	required: ['user_id', 'status', 'total_price'],
	additionalProperties: false,
}
const updateOrderStatusSchema = { type: 'string', minLength: 1 }

export const validateCreateOrder = ajv.compile(createOrderSchema)
export const validateUpdateOrderStatus = ajv.compile(updateOrderStatusSchema)
