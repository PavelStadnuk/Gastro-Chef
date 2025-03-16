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
const order_items_controller_1 = __importDefault(require("../controllers/order_items.controller"));
const OrderItems = {
    createOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_items_controller_1.default.createOrderItem(params);
        });
    },
    updateOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_items_controller_1.default.updateOrderItem(params);
        });
    },
    getOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_items_controller_1.default.getOrderItem(params);
        });
    },
    deleteOrderItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_items_controller_1.default.deleteOrderItem(params);
        });
    },
    getOrderItems(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_items_controller_1.default.getOrderItems(params);
        });
    },
};
exports.default = OrderItems;
