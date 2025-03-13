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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const db = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // змініть на свій пароль
    database: 'project',
    charset: 'utf8mb4',
});
// Функція для перевірки підключення
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield db.getConnection();
            console.log('✅ Підключено до MariaDB');
            connection.release(); // Важливо закрити з'єднання після перевірки
        }
        catch (error) {
            console.error('❌ Помилка підключення до MariaDB:', error);
            process.exit(1);
        }
    });
}
// Викликаємо перевірку при старті сервера
checkConnection();
exports.default = db;
