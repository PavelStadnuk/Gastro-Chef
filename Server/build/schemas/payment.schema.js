"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePayment = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const createPaymentSchema = {
    type: 'object',
    properties: {
        order_id: { type: 'number' },
        payment_method: { type: 'string', enum: ['card', 'paypal', 'cash'] },
        transaction_id: { type: 'string' },
    },
    required: ['order_id', 'payment_method', 'transaction_id'],
    additionalProperties: false,
};
exports.validateCreatePayment = ajv.compile(createPaymentSchema);
