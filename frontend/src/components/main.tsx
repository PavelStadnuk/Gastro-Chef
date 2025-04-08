'use client';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import bottle from '../assets/bottle.png';
import carrot from '../assets/carrot.png';
import fish from '../assets/fish.png';
import meat from '../assets/meat.png';
import table from '../assets/table.png';
import kkal from '../assets/Ккал.png';
import style from '../style/main.module.css';
type MainInformation = {
    text: string;
    image: StaticImageData;
};
type MainProps = {
    mainInformation: MainInformation[];
};

const Main = ({ mainInformation }: MainProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === mainInformation.length - 1 ? 0 : prevIndex + 1
        );
    };
    const prevSlide = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? mainInformation.length - 1 : prevIndex - 1
        );
    };
    const icons = [
        { icon: bottle, text: 'Вода' },
        { icon: carrot, text: 'Овощи' },
        { icon: fish, text: 'Рыба' },
        { icon: meat, text: 'Мясо' },
        { icon: kkal, text: 'Ккал' },
        { icon: table, text: 'Таблица' }
    ];
    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.icons}>
                    {icons.map(icon => {
                        return (
                            <div className={style.icon}>
                                <Image alt={icon.text} src={icon.icon} />
                            </div>
                        );
                    })}
                </div>
                <div className={style.textMain}>
                    <h1>{mainInformation[currentIndex].text}</h1>
                    <p>8 бутылочек натуральных смузи и фрешей.</p>
                    <div className={style.infoButton}>
                        <button>Заказать</button>
                        <div>
                            <p>Пробный день всего:</p>
                            <h2>427 грн</h2>
                        </div>
                    </div>
                </div>
                <div className={style.imageMain}>
                    <Image
                        alt="mango"
                        src={mainInformation[currentIndex].image}
                    />
                </div>
            </div>

            <div className={style.slider}>
                <span onClick={prevSlide} className={style.changeSlide}>
                    &lt;
                </span>
                {mainInformation.map((_, index) => {
                    return (
                        <span
                            key={index}
                            className={`${style.slide} ${
                                currentIndex === index ? style.activeSlide : ''
                            }`}
                        ></span>
                    );
                })}
                <span onClick={nextSlide} className={style.changeSlide}>
                    &gt;
                </span>
            </div>
            <div className={style.circle}></div>
        </main>
    );
};
export default Main;
