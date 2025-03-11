const Router = require('express')
const orderController = require('../controllers/order.controller')
const router = new Router()
router.post('/order', orderController.createOrder)
module.exports = router
