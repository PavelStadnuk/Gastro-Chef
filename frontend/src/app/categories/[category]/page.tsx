import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '../../../../api/category.api.js';
import { getProductsByCategory } from '../../../../api/product.api.js';
import style from '@/style/productsPage.module.scss';
import mainImage from '@/assets/candyCategoryMain.png';
import ProductCard from '../../../components/productCard'; 
import { Product } from '../../../../inerface/product.interface.js';
type Props = {
  params: {
    category: string;
  };
};
export default async function ProductsPage({ params }:Props) {
  let category;
  try {
    category = await getCategoryBySlug(params.category);
  } catch (err) {
    console.error('Error fetching category by slug:', err);
    return notFound();
  }

  let products = [];
  try {
    products = await getProductsByCategory(category.categoryId);
  } catch (err) {
    console.error('Error fetching products by category:', err);
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;



  return (
    <div>
      <div
        className={style.aboutCategory}
        style={{
         backgroundImage: `url(${category.mainImage ? `${API_URL}${category.mainImage}` : mainImage.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>

      <div className={style.products}>
        {products.map((product:Product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
