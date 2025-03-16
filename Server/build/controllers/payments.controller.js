"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const payment_schema_1 = require("../schemas/payment.schema");
class PaymentsController {
    createPayments(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, payment_schema_1.validateCreatePayment)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: payment_schema_1.validateCreatePayment.errors,
                    };
                }
                const { order_id, payment_method, transaction_id } = params;
                const [newPayment] = yield db_1.default.query('INSERT INTO payments (order_id, payment_method, transaction_id) VALUES (?, ?, ?)', [order_id, payment_method, transaction_id]);
                console.log('✅ Payment created:', newPayment);
                return { success: true, payment: newPayment };
            }
            catch (error) {
                console.error('❌ Error creating payment:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    getPayment(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const [payment] = yield db_1.default.query('SELECT * FROM payments WHERE id = ?', [
                    id,
                ]);
                return payment;
            }
            catch (error) {
                console.error('❌ Error getting payment:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
}
exports.default = new PaymentsController();
