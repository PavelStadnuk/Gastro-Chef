import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);
const programPlanBaseSchema = {
    type: 'object',
    properties: {
        programId: { type: 'integer', minimum: 1 },
        discount: { type: 'number', minimum: 0 },
        period: { type: 'string', minLength: 1, maxLength: 100 }    
    },
    required: ['programId', 'discount', 'period'],
    additionalProperties: false
};
export const programPlanCreateSchema = programPlanBaseSchema;
const programPlanUpdateSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
        ...programPlanBaseSchema.properties
    },
    required: ['id', 'programId', 'discount', 'period'],       
    additionalProperties: false
};

export const validateCreateProgramPlan = ajv.compile(programPlanCreateSchema);
export const validateUpdateProgramPlan = ajv.compile(programPlanUpdateSchema);