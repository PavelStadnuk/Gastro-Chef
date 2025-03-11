const Router = require('express')
const productsController = require('../controllers/products.controller')
const router = new Router()
router.post('/order', productsController.createOrder)
module.exports = router
