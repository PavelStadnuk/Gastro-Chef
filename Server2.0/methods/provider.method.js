import providerController from '../controllers/provider.controller.js';

const provider = {
    async createProvider(params) {
        return await providerController.createProvider(params);
    },
    async getProviderById(params) {
        return await providerController.getProviderById(params);
    },
    async getAllProviders() {
        return await providerController.getAllProviders();
    },
    async updateProvider(params) {
        return await providerController.updateProvider(params);
    },
    async deleteProvider(params) {
        return await providerController.deleteProvider(params);
    } 
};

export default provider;