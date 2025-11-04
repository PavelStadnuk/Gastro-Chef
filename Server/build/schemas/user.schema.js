"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateCreateUser = exports.validateLoginUser = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const userBaseSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
        name: { type: 'string', minLength: 1 },
        phone: { type: 'string', minLength: 10 },
        address: { type: 'string', minLength: 20 },
    },
    additionalProperties: false,
};
const createUserSchema = Object.assign(Object.assign({}, userBaseSchema), { required: ['email', 'password', 'name', 'phone', 'address'] });
const updateUserSchema = {
    type: 'object',
    properties: Object.assign({ id: { type: 'number' } }, userBaseSchema.properties),
    required: ['email', 'password', 'name', 'phone', 'address', 'id'],
    additionalProperties: false,
};
const loginUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
    },
    required: ['email', 'password'],
    additionalProperties: false,
};
exports.validateLoginUser = ajv.compile(loginUserSchema);
exports.validateCreateUser = ajv.compile(createUserSchema);
exports.validateUpdateUser = ajv.compile(updateUserSchema);
