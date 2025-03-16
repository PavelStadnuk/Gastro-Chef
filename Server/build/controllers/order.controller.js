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
const order_schema_1 = require("../schemas/order.schema");
class OrderController {
    createOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, order_schema_1.validateCreateOrder)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: order_schema_1.validateCreateOrder.errors,
                    };
                }
                const { user_id, total_price, status } = params;
                const [result] = yield db_1.default.execute('INSERT INTO orders (user_id, total_price,STATUS) VALUES (?, ?, ?)', [user_id, total_price, status]);
            }
            catch (error) {
                console.error('❌ Error creating user:', error);
                throw new Error('Database error');
            }
        });
    }
    getOrdersByUserId(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [orders] = yield db_1.default.query('SELECT * FROM orders WHERE user_id = ?', [params.user_id]);
                return orders;
            }
            catch (error) {
                console.error('❌ Error getting orders:', error);
                throw new Error('Database error');
            }
        });
    }
    updateOrderStatus(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id, status } = params;
            try {
                if (!(0, order_schema_1.validateUpdateOrderStatus)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: order_schema_1.validateCreateOrder.errors,
                    };
                }
                const [result] = yield db_1.default.execute('UPDATE orders SET STATUS = ? WHERE id = ?', [status, order_id]);
            }
            catch (error) {
                console.error('❌ Error updating order:', error);
                throw new Error('Database error');
            }
        });
    }
    deleteOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield db_1.default.execute('DELETE FROM orders WHERE id = ?', [params.order_id]);
            }
            catch (error) {
                console.error('❌ Error deleting order:', error);
                throw new Error('Database error');
            }
        });
    }
}
exports.default = new OrderController();
