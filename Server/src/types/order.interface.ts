interface Item {
	product_id: number
	quantity: number
	price: number
}

export interface OrderParams {
	user_id: number
	items: Item[]
	status: string
}
