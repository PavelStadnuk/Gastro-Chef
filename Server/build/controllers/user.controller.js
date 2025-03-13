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
class UserController {
    createUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, address } = params;
                // Додаємо користувача в базу
                const [result] = yield db_1.default.execute('INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)', [name, email, password, phone, address]);
                const userId = result.insertId;
                // Отримуємо створеного користувача
                const [rows] = yield db_1.default.execute('SELECT * FROM users WHERE id = ?', [userId]);
                return rows[0]; // ✅ Повертаємо об'єкт користувача
            }
            catch (error) {
                console.error('❌ Error creating user:', error);
                throw new Error('Database error');
            }
        });
    }
}
exports.default = new UserController();
