import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const programRowBaseSchema = {
    type: 'object',
    properties: {
    weekDay:{type: 'string', minLength: 1, maxLength: 100}, 
    programId:{ type: 'number' }, 
    mealName:{type: 'string', minLength: 1, maxLength: 100}, 
    timeMeal:{type: 'string', minLength: 1, maxLength: 100}, 
    productId:{ type: 'number' },
    
},
    required: ['weekDay','programId', 'mealName', 'timeMeal', 'productId'],
    additionalProperties: false
};

const createProgramRowSchema = {
    ...programRowBaseSchema
};
const updateProgramRowSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        ...programRowBaseSchema.properties
    },
    required: ['id', 'weekDay','programId'],
    additionalProperties: false
};
export const validateCreateProgramRow = ajv.compile(createProgramRowSchema);
export const validateUpdateProgramRow = ajv.compile(updateProgramRowSchema);