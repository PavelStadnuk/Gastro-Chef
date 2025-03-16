import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)
const createOrderItemSchema = {
	type: 'object',
	properties: {
		orderId: { type: 'number' },
		productId: { type: 'number' },
		quantity: { type: 'number' },
		price: { type: 'number' },
	},
	required: ['orderId', 'productId', 'quantity', 'price'],
	additionalProperties: false,
}
const updateOrderItemSchema = {
	type: 'object',
	properties: {
		orderItemsId: { type: 'number' },
		quantity: { type: 'number' },
		price: { type: 'number' },
	},
	required: ['orderItemsId', 'quantity', 'price'],
	additionalProperties: false,
}

export const validateCreateOrderItems = ajv.compile(createOrderItemSchema)
export const validateUpdateOrderItems = ajv.compile(updateOrderItemSchema)
