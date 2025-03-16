import express from 'express'
import { JSONRPCServer } from 'json-rpc-2.0'
import order from './methods/order.method'
import OrderItems from './methods/order_items.methods'
import payments from './methods/payments.method'
import product from './methods/product.method'
import user from './methods/user.method'
const server = new JSONRPCServer()
const app = express()
app.use(express.json())
server.addMethod('createUser', user.createUser)
server.addMethod('updateUser', user.updateUser)
server.addMethod('getUser', user.getUser)
server.addMethod('deleteUser', user.deleteUser)
server.addMethod('createOrder', order.createOrder)
server.addMethod('getOrdersByUserId', order.getOrdersByUserId)
server.addMethod('updateOrderStatus', order.updateOrderStatus)
server.addMethod('deleteOrder', order.deleteOrder)
server.addMethod('createPayment', payments.createPayments)
server.addMethod('getPayment', payments.getPayment)
server.addMethod('createOrderItem', OrderItems.createOrderItem)
server.addMethod('updateOrderItem', OrderItems.updateOrderItem)
server.addMethod('getOrderItem', OrderItems.getOrderItem)
server.addMethod('deleteOrderItem', OrderItems.deleteOrderItem)
server.addMethod('getOrderItems', OrderItems.getOrderItems)
server.addMethod('createProduct', product.createProduct)
server.addMethod('updateProduct', product.updateProduct)
server.addMethod('getProduct', product.getProduct)
server.addMethod('deleteProduct', product.deleteProduct)
server.addMethod('getProducts', product.getProducts)
// Обробка RPC-запитів
app.post('/rpc', async (req, res) => {
	const jsonRPCResponse = await server.receive(req.body)
	res.json(jsonRPCResponse)
})

// Запускаємо сервер
app.listen(3000, () => console.log('🚀 JSON-RPC Server running on port 3000'))
