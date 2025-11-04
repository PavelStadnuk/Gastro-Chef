import db from '../config/db.js';
import { validateCreateProvider, validateUpdateProvider } from '../schemas/provider.schema.js';
class ProviderController {
    async createProvider(params) {
        try {
            if (!validateCreateProvider(params)) {
                return {
                    code: -32602,
                    message: 'invalid params',
                    errors: validateCreateProvider.errors,
                };
            }

            const { name, price, workingHours,status } = params
            const [result] = await db.execute(
                `INSERT INTO providers (name, price, workingHours,status) 
                VALUES (?, ?, ?, ?)`, 
                [name, price, workingHours,status]
            );
            return { providerId: result.insertId };
        } catch (error) {
            console.error('❌ Error creating provider:', error);
            throw new Error('Database error');
        }
    }
    async getProviderById(params) {
        try {
            const { providerId } = params; 
            const [result] = await db.execute(
                'SELECT * FROM providers WHERE id = ?',
                [providerId]
            ); 
            return result;
        } catch (error) {
            console.error('❌ Error getting provider:', error);
            throw new Error('Database error');
        }  
    }
    async getAllProviders() {
        try {  
            const [result] = await db.execute(
                'SELECT * FROM providers'
            );
            return result;
        } catch (error) {
            console.error('❌ Error getting providers:', error);
            throw new Error('Database error');
        }
    }
    async updateProvider(params) {
        try {  
            if (!validateUpdateProvider(params)) {
                return {
                    code: -32602,
                    message: 'invalid params',
                    errors: validateUpdateProvider.errors,
                };
            }
            const { providerId, name, price, workingHours,status } = params;
            const [result] = await db.execute(
                `UPDATE providers 
                SET name = ?, price = ?, workingHours = ?, status = ? 
                WHERE id = ?`,
                [name, price, workingHours,status, providerId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error updating provider:', error);
            throw new Error('Database error');
        }   
    }
    async deleteProvider(params) {
        try {  
            const { providerId } = params;
            const [result] = await db.execute(
                'DELETE FROM providers WHERE id = ?',
                [providerId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error deleting provider:', error);
            throw new Error('Database error');
        }  
    }
}
export default new ProviderController();