import userController from '../controllers/user.controller.js'

const user = {
	async createUser(params) {
		return await userController.createUser(params)
	},
	async updateUser(params) {
		return await userController.updateUser(params)
	},
	async getUser(params) {
		return await userController.getUser(params)
	},
	async deleteUser(params) {
		return await userController.deleteUser(params)
	},
	async login(params) {
		return await userController.login(params)
	},
}

export default user
