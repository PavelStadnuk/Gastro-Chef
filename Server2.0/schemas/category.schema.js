import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const categoryBaseSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        description: { type: 'string', maxLength: 255 },
        slug: { type: 'string', minLength: 1, maxLength: 100 }
    },
    required: ['name' ,'slug' ,'description'] ,
    additionalProperties: false
};

const createCategorySchema = {
    ...categoryBaseSchema
};
const updateCategorySchema = {
    type: 'object',
    properties: {
        id: { type: 'number' }, 
        ...categoryBaseSchema.properties
    },
    required: ['id', 'name'],
    additionalProperties: false
};

export const validateCreateCategory = ajv.compile(createCategorySchema);
export const validateUpdateCategory = ajv.compile(updateCategorySchema);