import db from "../config/db.js";
import { validateUpdateUser, validateCreateUser } from '../schemas/user.schema.js';


class UserController {
    
    async createUser(params) {
        try {
            if (!validateCreateUser(params)) {
                return {
                    code: -32602,
                    message: 'invalid params',
                    errors: validateCreateUser.errors,
                };
            }

            const { name, email, phone, address } = params;

            const [result] = await db.execute(
                'INSERT INTO users (username, email, phone, address) VALUES (?, ?, ?, ?)',
                [name, email, phone, address]
            );

            return { userId: result.insertId };
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Database error');
        }
    }


    async updateUser(params) {
        try {
            if (!validateUpdateUser(params)) {
                return {
                    code: -32602,
                    message: 'invalid params',
                    errors: validateUpdateUser.errors,
                };
            }

            const { name, email, phone, address, id } = params;

            const [result] = await db.execute(
                'UPDATE users SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?',
                [name, email, phone, address, id]
            );

            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Database error');
        }
    }

    
    async getUser(params) {
        try {
            const { id } = params;

            const [rows] = await db.execute(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );

            return rows[0] || null;
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('Database error');
        }
    }

    
    async deleteUser(params) {
        try {
            const { id } = params;

            const [result] = await db.execute(
                'DELETE FROM users WHERE id = ?',
                [id]
            );

            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Database error');
        }
    }
}

export default new UserController();
