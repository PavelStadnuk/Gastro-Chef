import orderRawController from '../controllers/orderRaw.controller.js';

const orderRaw = {
    async createOrderRaw(params) {
        return await orderRawController.createOrderRaw(params);
    },
    async getOrderRawById(params) {
        return await orderRawController.getOrderRawById(params);
    },
    async getOrderRawsByOrderId(params) {
        return await orderRawController.getOrderRawsByOrderId(params);
    },
    async deleteOrderRaw(params) {
        return await orderRawController.deleteOrderRaw(params);
    },
    async updateOrderRaw(params) {
        return await orderRawController.updateOrderRaw(params);
    },
};

export default orderRaw;