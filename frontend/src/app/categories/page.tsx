import Image from 'next/image';
import Link from 'next/link';
import style from '@/style/categories.module.scss';
import { listCategories } from '../../../api/category.api.js';
import mokImage from '@/assets/candyCategory.png'
import { CategoryInterface } from '../../../inerface/category.interface.js';
export const dynamic = 'force-dynamic';
export default async function CategoriesPage() {
  const categories = await listCategories();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className={style.categoriesPage}>
      {categories.map((category:CategoryInterface) => (
        <div key={category.slug} className={style.categoryItem}>
          <Image src={category?.image ? `${API_URL}${category.image}` : mokImage} alt={category.name} width={200} height={200} />
          <div className={style.categoryContent}>
            <h3>{category.name}</h3>
            <Link href={`/categories/${category.slug}`}>Асортимент &gt;</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
