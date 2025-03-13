import express from 'express'
import { JSONRPCServer } from 'json-rpc-2.0'
import order from './methods/order.method'
import payments from './methods/payments.method'
import user from './methods/user.method'
const server = new JSONRPCServer()
const app = express()
app.use(express.json())
server.addMethod('createUser', user.createUser)
server.addMethod('updateUser', user.updateUser)
server.addMethod('getUser', user.getUser)
server.addMethod('deleteUser', user.deleteUser)
server.addMethod('createOrder', order.createOrder)
server.addMethod('createPayment', payments.createPayments)
// Обробка RPC-запитів
app.post('/rpc', async (req, res) => {
	const jsonRPCResponse = await server.receive(req.body)
	res.json(jsonRPCResponse)
})

// Запускаємо сервер
app.listen(3000, () => console.log('🚀 JSON-RPC Server running on port 3000'))
