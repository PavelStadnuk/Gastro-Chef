import orderController from '../controllers/order.controller.js';

const order = {
    async createOrder(params) {
        return await orderController.createOrder(params);
    },
    async getOrderById(params) {
        return await orderController.getOrderById(params);
    },
    async getOrdersByClientId(params) {
        return await orderController.getOrdersByClientId(params);
    },
    async deleteOrder(params) {
        return await orderController.deleteOrder(params);
    },
};

export default order;