import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv() 

addFormats(ajv);

const userBaseSchema = {
  type: 'object',  
    properties: {

    	email: { type: 'string', format: 'email' },
		phone: { type: 'string', minLength: 10 },
		name: { type: 'string', minLength: 1 },
		address: { type: 'string', minLength: 20 },
    },
    additionalProperties: false,
}
const createUserSchema = {
  ...userBaseSchema,
    required: ['email', 'phone', 'name',  'address'],
}

const updateUserSchema = {
type: 'object',
	properties: {
		id: { type: 'number' },
		...userBaseSchema.properties,
	},
	required: ['email', 'phone', 'name', 'address', 'id'],
	additionalProperties: false,
}
export const validateCreateUser = ajv.compile(createUserSchema);
export const validateUpdateUser = ajv.compile(updateUserSchema);