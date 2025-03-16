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
const order_items_schema_1 = require("../schemas/order_items.schema");
class orderItemsController {
    createOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, order_items_schema_1.validateCreateOrderItems)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: order_items_schema_1.validateCreateOrderItems.errors,
                    };
                }
                const { orderId, productId, quantity, price } = params;
                const [result] = yield db_1.default.execute('INSERT INTO orders_item (order_id, products_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, productId, quantity, price]);
            }
            catch (error) {
                console.error('❌ Error creating order item:', error);
                throw new Error('Database error');
            }
        });
    }
    updateOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, order_items_schema_1.validateUpdateOrderItems)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: order_items_schema_1.validateCreateOrderItems.errors,
                    };
                }
                const { orderId, productId, quantity, price } = params;
                const [result] = yield db_1.default.execute('UPDATE order_items SET order_id = ?, product_id = ?, quantity = ?, price = ? WHERE id = ?', [orderId, productId, quantity, price]);
            }
            catch (error) {
                console.error('❌ Error updating order item:', error);
                throw new Error('Database error');
            }
        });
    }
    getOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const [result] = yield db_1.default.execute('SELECT * FROM order_items WHERE id = ?', [id]);
            }
            catch (error) {
                console.error('❌ Error getting order item:', error);
                throw new Error('Database error');
            }
        });
    }
    deleteOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const [result] = yield db_1.default.execute('DELETE FROM order_items WHERE id = ?', [id]);
            }
            catch (error) {
                console.error('❌ Error deleting order item:', error);
                throw new Error('Database error');
            }
        });
    }
    getOrderItems(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = params;
                const [result] = yield db_1.default.execute('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
            }
            catch (error) {
                console.error('❌ Error getting order items:', error);
                throw new Error('Database error');
            }
        });
    }
}
exports.default = new orderItemsController();
