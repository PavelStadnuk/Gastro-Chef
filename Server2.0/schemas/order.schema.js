import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const orderSchema = {
  type: 'object',
  properties: {
    clientId: { type: 'number' },
    programPlanId: { type: 'number' },
    dateAdd: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    paymentMethod: { type: 'string', minLength: 1 },
    howConnectWithYou: { type: 'string' },
    whereHearAboutUs: { type: 'string' },
    price: { type: 'number', minimum: 0 }
  },
  required: ['clientId', 'programPlanId', 'dateAdd', 'paymentMethod', 'price'],
  additionalProperties: false
};

export const validateCreateOrder = ajv.compile(orderSchema);
