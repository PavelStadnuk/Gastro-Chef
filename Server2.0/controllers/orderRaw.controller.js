import db from '../config/db.js';
import {validateCreateOrderRaw,validateUpdateOrderRaw} from '../schemas/orderRaw.schema.js';
class OrderRawController {
    async createOrderRaw(params) {
        const { orderId, productId, providerId,dayToDeliver,timeToDeliver,status,weight,price,count} = params;
        try {
            if (!validateCreateOrderRaw(params)) {
                return { error: 'Invalid input', details: validateCreateOrderRaw.errors };
            }
            const [result] = await db.execute(
                `INSERT INTO orderraw (orderId, productId, providerId,dayToDeliver,timeToDeliver,status,weight,price,count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [orderId, productId, providerId,dayToDeliver,timeToDeliver,status,weight,price ,count]
            );
            return { orderRawId: result.insertId };  
        } catch (error) {
            console.error('Error creating order raw:', error);
            throw new Error('Database error');
        }
    }

    async getOrderRawById(params) {
        try {
            const { orderRawId } = params;  
            const [result] = await db.execute(
                'SELECT * FROM orderraw WHERE id = ?',
                [orderRawId]
            ); 
            return result[0] || null
        } catch (error) {
            console.error('Error getting order raw:', error);
            throw new Error('Database error');
        }
    }

    async getOrderRawsByOrderId(params) { 
        try {
            const { orderId } = params;  
            const [result] = await db.execute(
                'SELECT * FROM orderraw WHERE orderId = ?',
                [orderId]
            ); 
            return result;
        }
        catch (error) {
            console.error('Error getting order raws by order ID:', error);
            throw new Error('Database error');
        }
    }
    async deleteOrderRaw(params) {
        try {

            const { orderRawId } = params;
            const [result] = await db.execute(
                'DELETE FROM orderraw WHERE id = ?',        
                [orderRawId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error deleting order raw:', error);
            throw new Error('Database error');
        }   
    }
    async updateOrderRaw(params) {
        try {
            if (!validateUpdateOrderRaw(params)) {
                return { error: 'Invalid input', details: validateUpdateOrderRaw.errors };
            }
            const { orderRawId, status } = params;  
            const [result] = await db.execute(
                'UPDATE orderraw SET status = ? WHERE id = ?',
                [status, orderRawId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error updating order raw:', error);
            throw new Error('Database error');
        }   
    }
}

export default new OrderRawController();