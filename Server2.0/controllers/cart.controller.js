import db from '../config/db.js';
import redis from '../config/redis.js';

class CartController {

    
    async addToCart(params) {
        try {
            const { clientId, productId, quantity, price, weight, name } = params;
            const key = `cart:${clientId}`;
            const raw = await redis.get(key);
            const cart = raw ? JSON.parse(raw) : { products: {} };

            if (cart.products[productId]) {
                cart.products[productId].quantity += quantity;
                cart.products[productId].weight += weight;
            } else {
                cart.products[productId] = { quantity, price, weight, name };
            }

            await redis.set(key, JSON.stringify(cart));
            return { success: true, cart };
        } catch (error) {
            throw new Error('Error adding to cart: ' + error.message);
        }
    }

    
    async getCart(params) {
        try {
            const { clientId } = params;
            const key = `cart:${clientId}`;
            const raw = await redis.get(key);
            const cart = raw ? JSON.parse(raw) : { products: {} };
            return cart;
        } catch (error) {
            throw new Error('Error retrieving cart: ' + error.message);
        }
    }


    async clearCart(params) {
        try {
            const { clientId } = params;
            const key = `cart:${clientId}`;
            await redis.del(key);
            return { success: true, message: 'Cart cleared' };
        } catch (error) {
            throw new Error('Error clearing cart: ' + error.message);
        }
    }

    
    async updateQuantity(params) {
        try {
            const { clientId, productId, quantity } = params;
            const key = `cart:${clientId}`;
            const raw = await redis.get(key);
            if (!raw) return { success: false, message: "Cart not found" };
            const cart = JSON.parse(raw);

            if (!cart.products[productId]) {
                return { success: false, message: "Product not in cart" };
            }

            if (quantity <= 0) {
                delete cart.products[productId];
            } else {
                cart.products[productId].quantity = quantity;
            }

            await redis.set(key, JSON.stringify(cart));
            return { success: true, cart };
        } catch (error) {
            throw new Error("Error updating quantity: " + error.message);
        }
    }

    
    async removeFromCart(params) {
        try {
            const { clientId, productId } = params;
            const key = `cart:${clientId}`;
            const raw = await redis.get(key);
            if (!raw) return { success: false, message: "Cart not found" };
            const cart = JSON.parse(raw);

            delete cart.products[productId];
            await redis.set(key, JSON.stringify(cart));
            return { success: true, cart };
        } catch (error) {
            throw new Error("Error removing from cart: " + error.message);
        }
    }

    
    async checkout(params) {
        try {
            const { clientId, paymentMethod, howConnectWithYou, whereHearAboutUs } = params;
            const key = `cart:${clientId}`;
            const raw = await redis.get(key);
            const cart = raw ? JSON.parse(raw) : null;

            if (!cart || Object.keys(cart.products).length === 0) {
                return { success: false, message: "Cart is empty" };
            }

            let totalPrice = 0;
            let totalWeight = 0;
            for (const item of Object.values(cart.products)) {
                totalPrice += item.price * item.quantity;
                totalWeight += item.weight * item.quantity;
            }

            const [orderResult] = await db.execute(
                `INSERT INTO orders 
                (clientId, dateAdd, paymentMethod, programPlanId, howConnectWithYou, whereHearAboutUs, price)
                VALUES (?, NOW(), ?, NULL, ?, ?, ?)`,
                [clientId, paymentMethod, howConnectWithYou, whereHearAboutUs, totalPrice]
            );

            const orderId = orderResult.insertId;

            for (const [productId, item] of Object.entries(cart.products)) {
                await db.execute(
                    `INSERT INTO orderRaw 
                    (orderId, productId, providerId, dayToDeliver, timeToDeliver, status, weight, price)
                    VALUES (?, ?, NULL, NULL, NULL, 'pending', ?, ?)`,
                    [orderId, productId, item.weight, item.price * item.quantity]
                );
            }

            await redis.del(key);
            return { success: true, orderId, totalPrice, totalWeight };
        } catch (error) {
            throw new Error('Error during checkout: ' + error.message);
        }
    }
}

export default new CartController();
