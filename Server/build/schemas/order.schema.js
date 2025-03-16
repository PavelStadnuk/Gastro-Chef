"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateOrderStatus = exports.validateCreateOrder = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const createOrderSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'number' },
        total_price: { type: 'number' },
        status: {
            type: 'string',
            enum: ['new', 'shipped', 'delivered', 'canceled'],
        },
    },
    required: ['user_id', 'status', 'total_price'],
    additionalProperties: false,
};
const updateOrderStatusSchema = { type: 'string', minLength: 1 };
exports.validateCreateOrder = ajv.compile(createOrderSchema);
exports.validateUpdateOrderStatus = ajv.compile(updateOrderStatusSchema);
