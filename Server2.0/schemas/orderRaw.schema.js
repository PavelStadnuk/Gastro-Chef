import Ajv from 'ajv';
import addFormats from 'ajv-formats';


const ajv = new Ajv();
addFormats(ajv);

const orderRawBaseSchema = {
    type: 'object',
    properties: {
        orderId: { type: 'number' },
        productId: { type: 'number' },
        providerId: { type: 'number' },
        dayToDeliver: { type: 'string', format: 'date' },   
        timeToDeliver: { type: 'string'},
        status: { type: 'string', minLength: 1 },
        weight: { type: 'number', minimum: 0 },
        price: { type: 'number', minimum: 0 },
        count: { type: 'number', minimum: 1 }
    },
    required: ['orderId', 'productId', 'providerId', 'dayToDeliver', 'timeToDeliver', 'status', 'weight', 'price', 'count'],
    additionalProperties: false
};
const orderRawUpdateSchema = {
    type: 'object',
    properties: {
        orderRawId: { type: 'number' },
        status: { type: 'string', minLength: 1 }
    },
    required: ['orderRawId', 'status'],
    additionalProperties: false
};
export const validateCreateOrderRaw = ajv.compile(orderRawBaseSchema);
export const validateUpdateOrderRaw = ajv.compile(orderRawUpdateSchema);