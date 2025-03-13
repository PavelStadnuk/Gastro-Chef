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
class OrderController {
    createOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.default.getConnection();
            try {
                yield client.beginTransaction();
                const totalPrice = params.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                yield client.query('INSERT INTO orders (user_id, total_price,status) VALUES (?, ?,pending)', [params.user_id, totalPrice, params.status]);
                const [orderIdResult] = yield client.query('SELECT LAST_INSERT_ID() AS order_id');
                const orderId = orderIdResult[0].order_id;
                // 2️⃣ Додаємо товари у order_items
                const items = params.items;
                const values = items.map(() => '(?, ?, ?, ?)').join(', ');
                const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ${values}`;
                const queryParams = items.flatMap(item => [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price,
                ]);
                yield client.query(query, queryParams);
                yield client.commit(); // Завершуємо транзакцію
                return { message: 'Order created', order_id: orderId };
            }
            catch (err) {
                yield client.rollback();
                throw err;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.default = new OrderController();
