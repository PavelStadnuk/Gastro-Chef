"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateOrderItems = exports.validateCreateOrderItems = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const createOrderItemSchema = {
    type: 'object',
    properties: {
        orderId: { type: 'number' },
        productId: { type: 'number' },
        quantity: { type: 'number' },
        price: { type: 'number' },
    },
    required: ['orderId', 'productId', 'quantity', 'price'],
    additionalProperties: false,
};
const updateOrderItemSchema = {
    type: 'object',
    properties: {
        orderItemsId: { type: 'number' },
        quantity: { type: 'number' },
        price: { type: 'number' },
    },
    required: ['orderItemsId', 'quantity', 'price'],
    additionalProperties: false,
};
exports.validateCreateOrderItems = ajv.compile(createOrderItemSchema);
exports.validateUpdateOrderItems = ajv.compile(updateOrderItemSchema);
