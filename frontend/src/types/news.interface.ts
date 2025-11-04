import { StaticImageData } from 'next/image'
interface NewsDescription {
    text: string;
    image: StaticImageData[];

}
export interface NewsItem {
    id: number;
    slug: string;
    mainImage: StaticImageData;
    title: string;
    data: string;
    description: NewsDescription;
}

