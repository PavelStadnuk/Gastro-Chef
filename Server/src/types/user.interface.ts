export interface CreateUserParams {
	name: string
	email: string
	password: string
	phone: string
	address: string
}
export interface UpdateUserParams extends CreateUserParams {
	id: number
}
