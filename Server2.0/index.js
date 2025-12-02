import express from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';
import user from './methods/user.method.js';
import order from './methods/order.method.js';
import provider from './methods/provider.method.js';
import program from './methods/program.method.js';
import category from './methods/category.method.js';
import article from './methods/article.method.js';
import programPlan from './methods/programPlan.method.js';
import product from './methods/product.method.js';
import programRow from './methods/programRow.method.js';
import orderRaw from './methods/orderRaw.method.js';
import cart from './methods/cart.method.js';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
const app = express();
const server = new JSONRPCServer();

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true,
    })
);

server.addMethod('createUser', user.createUser);
server.addMethod('updateUser', user.updateUser);
server.addMethod('getUser', user.getUser);
server.addMethod('deleteUser', user.deleteUser);
server.addMethod('login', user.login);
server.addMethod('createOrder', order.createOrder);
server.addMethod('getOrderById', order.getOrderById);
server.addMethod('getOrdersByClientId', order.getOrdersByClientId);
server.addMethod('deleteOrder', order.deleteOrder);
server.addMethod('createProvider', provider.createProvider);
server.addMethod('getProviderById', provider.getProviderById);
server.addMethod('getAllProviders', provider.getAllProviders);
server.addMethod('updateProvider', provider.updateProvider);
server.addMethod('deleteProvider', provider.deleteProvider);
server.addMethod('createProgram', program.createProgram);
server.addMethod('getProgramById', program.getProgramById);
server.addMethod('getAllPrograms', program.getAllPrograms);
server.addMethod('deleteProgram', program.deleteProgram);
server.addMethod('updateProgram', program.updateProgram);
server.addMethod('createCategory', category.createCategory);
server.addMethod('getCategoryById', category.getCategoryById);
server.addMethod('updateCategory', category.updateCategory);
server.addMethod('deleteCategory', category.deleteCategory);
server.addMethod('listCategories', category.listCategories);
server.addMethod('getCategoryBySlug', category.getCategoryBySlug);
server.addMethod('updateCategoryImages', category.updateCategoryImages);
server.addMethod('createArticle', article.createArticle);
server.addMethod('getArticleById', article.getArticleById);
server.addMethod('updateArticle', article.updateArticle);
server.addMethod('deleteArticle', article.deleteArticle);
server.addMethod('listArticles', article.listArticles);
server.addMethod('getArticleBySlug', article.getArticleBySlug);
server.addMethod('createProgramPlan', programPlan.createProgramPlan);
server.addMethod('getProgramPlanById', programPlan.getProgramPlanById);
server.addMethod('updateProgramPlan', programPlan.updateProgramPlan);
server.addMethod('deleteProgramPlan', programPlan.deleteProgramPlan);
server.addMethod('createProduct', product.createProduct);
server.addMethod('getProductById', product.getProductById);
server.addMethod('updateProduct', product.updateProduct);
server.addMethod('deleteProduct', product.deleteProduct);
server.addMethod('getAllProducts', product.getAllProducts);
server.addMethod('getProductsByCategory', product.getProductsByCategory);
server.addMethod('updateProductImage', product.updateProductImage);
server.addMethod('createProgramRow', programRow.createProgramRow);
server.addMethod('getProgramRowById', programRow.getProgramRowById);
server.addMethod(
    'getProgramRowsByProgramId',
    programRow.getProgramRowsByProgramId
);
server.addMethod('deleteProgramRow', programRow.deleteProgramRow);
server.addMethod('updateProgramRow', programRow.updateProgramRow);
server.addMethod('createOrderRaw', orderRaw.createOrderRaw);
server.addMethod('getOrderRawById', orderRaw.getOrderRawById);
server.addMethod('getOrderRawsByOrderId', orderRaw.getOrderRawsByOrderId);
server.addMethod('deleteOrderRaw', orderRaw.deleteOrderRaw);
server.addMethod('updateOrderRaw', orderRaw.updateOrderRaw);
server.addMethod('addToCart', cart.addToCart.bind(cart));
server.addMethod('getCart', cart.getCart.bind(cart));
server.addMethod('clearCart', cart.clearCart.bind(cart));
server.addMethod('checkout', cart.checkout.bind(cart));
server.addMethod('updateQuantity', cart.updateQuantity.bind(cart));
server.addMethod('removeFromCart', cart.removeFromCart.bind(cart));

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);

app.use('/assets', express.static('assets'));

app.post('/rpc', async (req, res) => {
    const jsonRPCResponse = await server.receive(req.body);
    if (jsonRPCResponse) res.json(jsonRPCResponse);
    else res.sendStatus(204);
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`JSON-RPC Server running on port ${PORT}`));
