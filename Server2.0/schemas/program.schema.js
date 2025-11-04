import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);
const providerBaseSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        price: { type: 'number', minimum: 0 },
        type: { type: 'string', minLength: 1 },
        calorieContent: { type: 'string', minLength: 1}
    }, 
    additionalProperties: false,
}
const createProgramSchema = {  
    ...providerBaseSchema,
    required: ['name', 'description', 'price','type'],
}
const updateProgramSchema = {
    type: 'object',
    properties: {
        programId: { type: 'number' },
        ...providerBaseSchema.properties,
    },
    required: ['name', 'description', 'price','type', 'programId',`calorieContent`],
    additionalProperties: false,
}
export const validateCreateProgram = ajv.compile(createProgramSchema);
export const validateUpdateProgram = ajv.compile(updateProgramSchema);