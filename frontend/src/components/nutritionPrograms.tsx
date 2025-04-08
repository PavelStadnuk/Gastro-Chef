'use client';
import delivery from '@/assets/delivery.png';
import eco from '@/assets/eco.png';
import energy from '@/assets/energy.png';
import night from '@/assets/night.png';
import service from '@/assets/service.png';
import time from '@/assets/time.png';
import Image from 'next/image';
import style from '../style/nutritionPrograms.module.css';
import { powerProgramMas } from './dara';
import { useState } from 'react';
const NutritionPrograms = () => {
    const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const ourPasses = [
        { text: 'Бережём природу.Эко-тара и проборы.', image: eco },
        { text: '28 дней без повторения, более 300 блюд!', image: service },
        { text: 'Бесплатно заменяем блюда и ингредиенты.', image: time },
        { text: 'Готовим ночью, упаковываем и отправляем Вам!', image: night },
        {
            text: 'Ежедневная удобная и бесплатная доставкас 6:00 до 10:00',
            image: delivery
        },
        {
            text: 'Сохраняем Вашу энергию и до 14 часов в неделю освобождая от готовки!',
            image: energy
        }
    ];
    const shareMas = [
        { name: 'Тестовий день', oldPrice: '510грн', newPrice: '357грн' },
        { name: '1 день', oldPrice: '', newPrice: '510грн' },
        { name: 'от 7 дней', oldPrice: '510грн', newPrice: '490грн' },
        { name: 'от 14 дней', oldPrice: '510грн', newPrice: '470грн' },
        { name: 'от 30 дней ', oldPrice: '510грн', newPrice: '445грн' },
        { name: 'Завтрак и ужин', oldPrice: '560грн', newPrice: '433грн' }
    ];
    return (
        <div className={style.wrapper}>
            <div className={style.ourPasses}>
                {ourPasses.map(element => {
                    return (
                        <div className={style.ourPass}>
                            <Image alt={element.text} src={element.image} />
                            <p>{element.text}</p>
                        </div>
                    );
                })}
            </div>
            <div className={style.ourPrograms}>
                <button>Программы питания</button>
                <button>Специальные программы</button>
            </div>
            <div className={style.ourPasses}>
                {powerProgramMas.map((program, index) => {
                    return (
                        <div
                            onClick={() => setCurrentProgramIndex(index)}
                            className={
                                currentProgramIndex === index
                                    ? style.active
                                    : ''
                            }
                        >
                            <h2>{program.name}</h2>
                            <p>{program.calorieContent}</p>
                        </div>
                    );
                })}
            </div>
            <div className={style.wrapperPrograms}>
                <div className={style.programs}>
                    <div className={style.programsInfo}>
                        <div className={style.nameCaloriies}>
                            <h2>{powerProgramMas[currentProgramIndex].name}</h2>
                            <p>
                                {
                                    powerProgramMas[currentProgramIndex]
                                        .calorieContent
                                }
                            </p>
                        </div>
                        <p>
                            {powerProgramMas[currentProgramIndex].description}
                        </p>
                    </div>
                    <div className={style.shares}>
                        {shareMas.map(share => {
                            return (
                                <div className={style.share}>
                                    <p className={style.shareName}>
                                        {share.name}
                                    </p>
                                    <p className={style.shareOldprace}>
                                        {share.oldPrice}
                                    </p>
                                    <p className={style.shareNewPrice}>
                                        {share.newPrice}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className={style.buttonShare}>
                        <button>Заказать</button>
                    </div>
                </div>
                <div>
                    <div className={style.days}>
                        {powerProgramMas[0].plan.map((day, index) => {
                            return (
                                <h1
                                    onClick={() => setCurrentDayIndex(index)}
                                    className={
                                        currentDayIndex === index
                                            ? style.active
                                            : ''
                                    }
                                >
                                    {day.day}
                                </h1>
                            );
                        })}
                    </div>
                    <div className={style.dayPlans}>
                        {powerProgramMas[currentProgramIndex].plan[
                            currentDayIndex
                        ].meals.map((meal, mealIndex) => {
                            return (
                                <div key={mealIndex} className={style.dayPlan}>
                                    <h3 className={style.mealName}>
                                        {meal.meal}
                                    </h3>{' '}
                                    <p className={style.mealTime}>
                                        {meal.timeMeal}
                                    </p>
                                    <div className={style.productInformation}>
                                        <div>
                                            {meal.description.map(
                                                (item, descIndex) => (
                                                    <div
                                                        className={
                                                            style.planName
                                                        }
                                                    >
                                                        <p key={descIndex}>
                                                            {item?.name}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div>
                                            {meal.description.map(
                                                (item, descIndex) => (
                                                    <div>
                                                        <p>{item?.weight}</p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NutritionPrograms;
