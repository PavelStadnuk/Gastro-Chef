import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);
const articleBaseSchema = {
    type: 'object',
    properties: {   
        title: { type: 'string', minLength: 1, maxLength: 200 },
        content: { type: 'string', minLength: 1 },
        dateAdd: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
        slug: { type: 'string', minLength: 1, maxLength: 300},
    },
    required: ['title', 'content', 'dateAdd', 'slug'],
    additionalProperties: false
};
const createArticleSchema = {
    ...articleBaseSchema
};
const updateArticleSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        ...articleBaseSchema.properties
    },
    required: ['id', 'title', 'content'],
    additionalProperties: false
};
export const validateCreateArticle = ajv.compile(createArticleSchema);
export const validateUpdateArticle = ajv.compile(updateArticleSchema);