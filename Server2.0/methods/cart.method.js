import cartController from '../controllers/cart.controller.js';

const cart = {
    addToCart: params => cartController.addToCart(params),
    getCart: params => cartController.getCart(params),
    clearCart: params => cartController.clearCart(params),
    checkout: params => cartController.checkout(params),
    updateQuantity: params => cartController.updateQuantity(params),
    removeFromCart: params => cartController.removeFromCart(params),
    
};

export default cart;
