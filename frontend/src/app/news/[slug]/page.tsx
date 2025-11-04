import { getArticleBySlug } from '../../../../api/article.api.js';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import style from '@/style/newsDetailPage.module.scss';

const NewsDetailPage = async ({ params }: { params: { slug: string } }) => {
  const article = await getArticleBySlug(params.slug);

  if (!article) notFound();

  return (
    <div className={style.newsDetailPage}>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
};

export default NewsDetailPage;
