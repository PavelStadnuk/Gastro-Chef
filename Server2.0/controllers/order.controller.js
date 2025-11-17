import db from "../config/db.js";
import { validateCreateOrder } from '../schemas/order.schema.js';
class OrderController {
    async createOrder(params) {
        try {
            if (!validateCreateOrder(params)) {
                return {
                    code: -32602,
                    message: 'invalid params',
                    errors: validateCreateOrder.errors,
                };
            }
            const { clientId, programPlanId, dateAdd, paymentMethod, howConnectWithYou, whereHearAboutUs, price } = params;
            
            const [result] = await db.execute(
                `INSERT INTO orders 
                (clientId, programPlanId, dateAdd, paymentMethod, howConnectWithYou, whereHearAboutUs, price) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [clientId, programPlanId, dateAdd, paymentMethod, howConnectWithYou, whereHearAboutUs, price]
            );

            return { orderId: result.insertId };
        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Database error');
        }
    }
    async getOrderById(params) {
        try {
            const { orderId } = params;
            const [result] = await db.execute(
                'SELECT * FROM orders WHERE orderRawId = ?',
                [orderId]
            ); 
            return result;
        } catch (error) {
            console.error('Error getting order:', error);
            throw new Error('Database error');
        }
    }
    async getOrdersByClientId(params) {
        try {
            const { clientId } = params;
            const [result] = await db.execute(
                'SELECT * FROM orders WHERE clientId = ?',
                [clientId]
            );
            return result;
        } catch (error) {
            console.error('Error getting orders:', error);
            throw new Error('Database error');
        }
    }
    async deleteOrder(params) {
        try {
            const { orderId } = params; 
            const [result] = await db.execute(
                'DELETE FROM orders WHERE orderRawId = ?',
                [orderId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Database error');
        }  
    }
}

export default new OrderController();
