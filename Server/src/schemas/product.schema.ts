import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)

const productBaseSchema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1 },
		description: { type: 'string', minLength: 1 },
		price: { type: 'number', minimum: 0 },
		image: { type: 'string', format: 'uri' },
		stockQuantity: { type: 'number', minimum: 0 },
		categoryName: { type: 'string', minLength: 1 },
	},
	required: [
		'name',
		'description',
		'price',
		'image',
		'stockQuantity',
		'categoryName',
	],
	additionalProperties: false,
}
const createProductSchema = {
	...productBaseSchema,
}
const updateProductSchema = {
	type: 'object',
	properties: { id: { type: 'number' }, ...productBaseSchema.properties },
	required: [
		'id',
		'name',
		'description',
		'price',
		'image',
		'stockQuantity',
		'categoryName',
	],
	additionalProperties: false,
}
export const validateCreateProduct = ajv.compile(createProductSchema)
export const validateUpdateProduct = ajv.compile(updateProductSchema)
