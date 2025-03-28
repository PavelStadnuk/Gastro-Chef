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
const express_1 = __importDefault(require("express"));
const json_rpc_2_0_1 = require("json-rpc-2.0");
const order_method_1 = __importDefault(require("./methods/order.method"));
const order_items_methods_1 = __importDefault(require("./methods/order_items.methods"));
const payments_method_1 = __importDefault(require("./methods/payments.method"));
const product_method_1 = __importDefault(require("./methods/product.method"));
const user_method_1 = __importDefault(require("./methods/user.method"));
const server = new json_rpc_2_0_1.JSONRPCServer();
const app = (0, express_1.default)();
app.use(express_1.default.json());
server.addMethod('createUser', user_method_1.default.createUser);
server.addMethod('updateUser', user_method_1.default.updateUser);
server.addMethod('getUser', user_method_1.default.getUser);
server.addMethod('deleteUser', user_method_1.default.deleteUser);
server.addMethod('createOrder', order_method_1.default.createOrder);
server.addMethod('getOrdersByUserId', order_method_1.default.getOrdersByUserId);
server.addMethod('updateOrderStatus', order_method_1.default.updateOrderStatus);
server.addMethod('deleteOrder', order_method_1.default.deleteOrder);
server.addMethod('createPayment', payments_method_1.default.createPayments);
server.addMethod('getPayment', payments_method_1.default.getPayment);
server.addMethod('createOrderItem', order_items_methods_1.default.createOrderItem);
server.addMethod('updateOrderItem', order_items_methods_1.default.updateOrderItem);
server.addMethod('getOrderItem', order_items_methods_1.default.getOrderItem);
server.addMethod('deleteOrderItem', order_items_methods_1.default.deleteOrderItem);
server.addMethod('getOrderItems', order_items_methods_1.default.getOrderItems);
server.addMethod('createProduct', product_method_1.default.createProduct);
server.addMethod('updateProduct', product_method_1.default.updateProduct);
server.addMethod('getProduct', product_method_1.default.getProduct);
server.addMethod('deleteProduct', product_method_1.default.deleteProduct);
server.addMethod('getProducts', product_method_1.default.getProducts);
// Обробка RPC-запитів
app.post('/rpc', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRPCResponse = yield server.receive(req.body);
    res.json(jsonRPCResponse);
}));
// Запускаємо сервер
app.listen(3000, () => console.log('🚀 JSON-RPC Server running on port 3000'));
