import mas from '@/assets/mas.png';
import mas1 from '@/assets/mas1.png';
import mas2 from '@/assets/mas2.png';
import mas3 from '@/assets/mas3.png';
import mas4 from '@/assets/mas4.png';
import mas5 from '@/assets/mas5.png';
import { ImageCarouselProps } from '@/types/slider.interface';
import { StaticImageData } from 'next/image';
import style from '../style/mainSlider.module.css';
import { Sliker } from './slider';
const MainSlider = () => {
    const masPhoto: StaticImageData[] = [mas, mas1, mas2, mas3, mas4, mas5];
    const settings: ImageCarouselProps['settings'] = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        speed: 5000,
        autoplaySpeed: 0,
        cssEase: 'linear',
        className: 'slider variable-width'
    };
    return (
        <div className={style.wrapperMainSlider}>
            <h1>Фото блюд</h1>
            <Sliker masPhoto={masPhoto} settings={settings} />
        </div>
    );
};
export default MainSlider;
