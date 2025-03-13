import userController from '../controllers/user.controller'
import { CreateUserParams, UpdateUserParams } from '../types/user.interface'
const user = {
	async createUser(params: CreateUserParams) {
		return await userController.createUser(params)
	},
	async updateUser(params: UpdateUserParams) {
		return await userController.updateUser(params)
	},
	async getUser(params: { id: number }) {
		return await userController.getUser(params)
	},
	async deleteUser(params: { id: number }) {
		return await userController.deleteUser(params)
	},
}

export default user
