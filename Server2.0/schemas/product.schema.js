import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);
const productBaseSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        price: { type: 'number', minimum: 0 },
        weight: { type: 'number', minimum: 0 },
        description: { type: 'string', minLength: 1, maxLength: 500 },
        categoryId: { type: 'number' },
        providerId: { type: 'number' }
    },
    required: ['name', 'price', 'weight', 'description', 'categoryId', 'providerId'],
    additionalProperties: false
};
const createProductSchema = {
    ...productBaseSchema
};
const updateProductSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        ...productBaseSchema.properties
    },
    required: ['id', 'name', 'price', 'weight', 'description', 'categoryId', 'providerId'],
    additionalProperties: false
};
export const validateCreateProduct = ajv.compile(createProductSchema);
export const validateUpdateProduct = ajv.compile(updateProductSchema);