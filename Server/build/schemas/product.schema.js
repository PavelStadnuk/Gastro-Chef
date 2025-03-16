"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateProduct = exports.validateCreateProduct = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const productBaseSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        price: { type: 'number', minimum: 0 },
        image: { type: 'string', format: 'uri' },
        stockQuantity: { type: 'number', minimum: 0 },
        categoryName: { type: 'string', minLength: 1 },
    },
    required: [
        'name',
        'description',
        'price',
        'image',
        'stockQuantity',
        'categoryName',
    ],
    additionalProperties: false,
};
const createProductSchema = Object.assign({}, productBaseSchema);
const updateProductSchema = {
    type: 'object',
    properties: Object.assign({ id: { type: 'number' } }, productBaseSchema.properties),
    required: [
        'id',
        'name',
        'description',
        'price',
        'image',
        'stockQuantity',
        'categoryName',
    ],
    additionalProperties: false,
};
exports.validateCreateProduct = ajv.compile(createProductSchema);
exports.validateUpdateProduct = ajv.compile(updateProductSchema);
