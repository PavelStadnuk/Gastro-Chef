const Router = require('express')
const paymentsController = require('../controllers/payments.controller')
const router = new Router()
router.post('/payments', paymentsController.createPayments)
module.exports = router
