interface Item {
	product_id: number
	quantity: number
	price: number
}

export interface OrderParams {
	user_id: number
	total_price: number
	status: string
}
export interface updateOrderStatus {
	order_id: number
	status: string
}
