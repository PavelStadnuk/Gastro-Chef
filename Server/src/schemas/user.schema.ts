import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)
const userBaseSchema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 8 },
		name: { type: 'string', minLength: 1 },
		phone: { type: 'string', minLength: 10 },
		address: { type: 'string', minLength: 20 },
	},
	additionalProperties: false,
}
const createUserSchema = {
	...userBaseSchema,
	required: ['email', 'password', 'name', 'phone', 'address'],
}
const updateUserSchema = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		...userBaseSchema.properties,
	},
	required: ['email', 'password', 'name', 'phone', 'address', 'id'],
	additionalProperties: false,
}

export const validateCreateUser = ajv.compile(createUserSchema)
export const validateUpdateUser = ajv.compile(updateUserSchema)
