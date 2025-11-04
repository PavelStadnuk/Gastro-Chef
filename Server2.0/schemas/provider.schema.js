import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const providerBaseSchema = {
    type: 'object',
    properties: {name: { type: 'string', minLength: 1 },
                 price: { type: 'number', minimum: 0 },
                 workingHours: { type: 'string', minLength: 5 },
                    status: { type: 'string', enum: ['active', 'inactive'] },
                },
    additionalProperties: false,
}
const createProviderSchema = {
    ...providerBaseSchema,
    required: ['name', 'price', 'workingHours','status'],
}
const updateProviderSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        ...providerBaseSchema.properties,
    },
    required: ['name', 'price', 'workingHours','status', 'id'],
    additionalProperties: false,
}
export const validateCreateProvider = ajv.compile(createProviderSchema);
export const validateUpdateProvider = ajv.compile(updateProviderSchema);