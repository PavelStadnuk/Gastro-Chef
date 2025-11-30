import { listArticles } from '../../../../../api/article.api.js';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/style/news.module.scss';
import newsImage from '@/assets/newsFish1.png'
import { ArticleInterface } from '../../../../../inerface/news.interface.js';
const itemsPerPage = 8;

export default async function NewsPage({ params }: { params: Promise<{ page: string }> }) {
const { page: pageParam } = await params;
  const page = parseInt(pageParam);
  const data = await listArticles(page, itemsPerPage);
  const newsItems = data.articles; 
  const totalPages = Math.ceil(data.total / itemsPerPage);

  if (isNaN(page) || page < 1 || page > totalPages) {
    return <div>Сторінка не знайдена</div>;
  }
  

  return (
    <div className={style.newsPage}>
      <div className={style.newsItems}>
        {newsItems.map((item:ArticleInterface) => (
          <div key={item.articleId} className={style.newsItem}>
            <Image src={newsImage} alt={item.title} width={300} height={200} className={style.mainImage}/>
            <h3>{item.title}</h3>
            <div className={style.newsContent}>
              <p>{item.dateAdd}</p>
              <Link href={`/news/${item.slug}`}>Детальніше &gt;</Link>
            </div>
          </div>
        ))}
      </div>

      <div className={style.pagination} style={{ marginTop: '20px' }}>
        {page > 1 ? <Link href={`/news/page/${page - 1}`}>←</Link> : <span>←</span>}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <Link
            key={pageNum}
            href={`/news/page/${pageNum}`}
            className={`${style.page} ${page === pageNum ? style.active : ''}`}
          >
            {pageNum}
          </Link>
        ))}
        {page < totalPages ? <Link href={`/news/page/${page + 1}`}>→</Link> : <span>→</span>}
      </div>
    </div>
  );
}
