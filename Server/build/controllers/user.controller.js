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
const user_schema_1 = require("../schemas/user.schema");
class UserController {
    createUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, user_schema_1.validateCreateUser)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: user_schema_1.validateCreateUser.errors,
                    };
                }
                const { name, email, password, phone, address } = params;
                const [result] = yield db_1.default.execute('INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)', [name, email, password, phone, address]);
            }
            catch (error) {
                console.error('❌ Error creating user:', error);
                throw new Error('Database error');
            }
        });
    }
    updateUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, user_schema_1.validateCreateUser)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: user_schema_1.validateCreateUser.errors,
                    };
                }
                const { name, email, password, phone, address, id } = params;
                const [result] = yield db_1.default.execute('UPDATE users SET name = ?, email = ?, password = ?, phone = ?, address = ? WHERE id = ?', [name, email, password, phone, address, id]);
            }
            catch (error) {
                console.error('❌ Error  update user:', error);
                throw new Error('Database error');
            }
        });
    }
    getUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, user_schema_1.validateCreateUser)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: user_schema_1.validateCreateUser.errors,
                    };
                }
                const { id } = params;
                const [result] = yield db_1.default.execute('SELECT * FROM users WHERE id = ?', [id]);
            }
            catch (error) {
                console.error('❌ Error getting user:', error);
                throw new Error('Database error');
            }
        });
    }
    deleteUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, user_schema_1.validateCreateUser)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: user_schema_1.validateCreateUser.errors,
                    };
                }
                const { id } = params;
                const [result] = yield db_1.default.execute('DELETE  FROM users WHERE id = ?', [id]);
            }
            catch (error) {
                console.error('❌ Error delete user:', error);
                throw new Error('Database error');
            }
        });
    }
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, user_schema_1.validateLoginUser)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: user_schema_1.validateCreateUser.errors,
                    };
                }
                const { email, password } = params;
                const [result] = yield db_1.default.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
            }
            catch (error) {
                console.error('❌ Error login:', error);
                throw new Error('Database error');
            }
        });
    }
}
exports.default = new UserController();
