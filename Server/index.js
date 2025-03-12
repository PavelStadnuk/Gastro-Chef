const express = require('express')
const { JSONRPCServer } = require('json-rpc-2.0')
const { user } = require('./methods/user.method')
const { order } = require('./methods/order.method')
const { payment } = require('./methods/payment.method')
const server = new JSONRPCServer()
const app = express()
app.use(express.json())
server.addMethod('createUser', user.createUser)
server.addMethod('createOrder', order.createOrder)
server.addMethod('createPayment', payment.createPayment)
// Обробка RPC-запитів
app.post('/rpc', async (req, res) => {
	const jsonRPCResponse = await server.receive(req.body)
	res.json(jsonRPCResponse)
})

// Запускаємо сервер
app.listen(3000, () => console.log('🚀 JSON-RPC Server running on port 3000'))
