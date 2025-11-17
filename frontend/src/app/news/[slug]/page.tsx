import { getArticleBySlug } from '../../../../api/article.api.js';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import style from '@/style/newsDetailPage.module.scss';
type NewsDetailPageProps = {
    params: { slug: string };
};

const NewsDetailPage = async ({
    params
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const article = await getArticleBySlug(slug);

    if (!article) notFound();

    return (
        <div className={style.newsDetailPage}>
            <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
    );
};

export default NewsDetailPage;
