const userController = require('../controllers/user.controller')
const user = {
	async createUser(params) {
		return await userController.createUser(params)
	},
}

module.exports = user
