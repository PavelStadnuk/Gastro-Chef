// export interface product {
// 	name: string
// 	price: number
// 	description: string
// 	image: string
// 	category: string
// 	id: number
// }
export interface product {
	name: string
	price: number
	stockQuantity: number
	image: string
	categoryName: string
	description: string
}
export interface productUpdate extends product {
	id: number
}
