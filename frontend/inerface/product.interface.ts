export interface Product {
  productId: number;       
  name: string;
  price: number;
  weight?: number;
  Composition?: string;
  Proteins?: number;
  Fats?: number;
  Carbohydrates?: number;
  Calories?: number;
  imagePath?: string;
}
export interface ProductCardProps {
  product: Product;
}
