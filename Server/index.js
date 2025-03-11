const express = require('express')
const { JSONRPCServer } = require('json-rpc-2.0')
const userController = require('./controllers/user.controller')

const server = new JSONRPCServer()
const app = express()
app.use(express.json())

// Додаємо метод createUser
server.addMethod('createUser', async params => {
	return await userController.createUser(params)
})

// Обробка RPC-запитів
app.post('/rpc', async (req, res) => {
	const jsonRPCResponse = await server.receive(req.body)
	res.json(jsonRPCResponse)
})

// Запускаємо сервер
app.listen(3000, () => console.log('🚀 JSON-RPC Server running on port 3000'))
