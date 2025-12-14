'use client';
import Image from 'next/image';
import style from '../style/nutritionPrograms.module.scss';
import { useState, useEffect } from 'react';
import {
    getAllPrograms,
    getProgramRows
} from '../../api/nutritionPrograms.api.js';
import delivery from '@/assets/delivery.png';
import eco from '@/assets/eco.png';
import energy from '@/assets/energy.png';
import night from '@/assets/night.png';
import service from '@/assets/service.png';
import time from '@/assets/time.png';
import { NutritionProgram } from '../../inerface/nutrition.interface.js';
const NutritionPrograms = () => {
    const [programs, setPrograms] = useState<NutritionProgram[]>([]);
    const [currentProgramIndex, setCurrentProgramIndex] = useState<number>(0);
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);

    const ourPasses = [
        { text: 'Бережём природу. Эко-тара и проборы.', image: eco },
        { text: '28 дней без повторения, более 300 блюд!', image: service },
        { text: 'Бесплатно заменяем блюда и ингредиенты.', image: time },
        { text: 'Готовим ночью, упаковываем и отправляем Вам!', image: night },
        {
            text: 'Ежедневная удобная и бесплатная доставка с 6:00 до 10:00',
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
    useEffect(() => {
        async function fetchPrograms() {
            try {
                const progs = await getAllPrograms();

                const programsWithPlan = await Promise.all(
                    progs.map(async (p: NutritionProgram) => {
                        const plan = await getProgramRows(p.programId);
                        return { ...p, plan };
                    })
                );
                setPrograms(programsWithPlan);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        }

        fetchPrograms();
    }, []);

    if (!programs.length) return <p>Loading...</p>;

    return (
        <div className={style.wrapper}>
            <div className={style.ourPasses}>
                {ourPasses.map((element, index) => (
                    <div key={index} className={style.ourPass}>
                        <Image
                            alt={element.text}
                            src={element.image}
                            className={style.ourPassImage}
                        />
                        <p>{element.text}</p>
                    </div>
                ))}
            </div>

            <div className={style.ourPrograms}>
                <button>Программы питания</button>
                <button>Специальные программы</button>
            </div>

            <div className={style.ourPasses}>
                {programs.map((program, index) => (
                    <div
                        key={program.programId}
                        onClick={() => setCurrentProgramIndex(index)}
                        className={`${
                            currentProgramIndex === index ? style.active : ''
                        } ${style.ourPass}`}
                    >
                        <h2>{program.name}</h2>
                        <p>{program.price} грн</p>
                    </div>
                ))}
            </div>

            <div className={style.wrapperPrograms}>
                <div className={style.programs}>
                    <div className={style.programsInfo}>
                        <div className={style.nameCaloriies}>
                            <h2>{programs[currentProgramIndex].name}</h2>
                            <p>{programs[currentProgramIndex].description}</p>
                        </div>
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
                </div>

                <div className={style.programDetails}>
                    <div className={style.days}>
                        {programs[currentProgramIndex].plan.map(
                            (day, index) => (
                                <h1
                                    key={index}
                                    onClick={() => setCurrentDayIndex(index)}
                                    className={
                                        currentDayIndex === index
                                            ? style.active
                                            : ''
                                    }
                                >
                                    {day.weekDay}
                                </h1>
                            )
                        )}
                    </div>

                    <div className={style.dayPlans}>
                        {programs[currentProgramIndex].plan[
                            currentDayIndex
                        ]?.meals?.map((meal, mealIndex) => (
                            <div key={mealIndex} className={style.dayPlan}>
                                <h3 className={style.mealName}>{meal.meal}</h3>
                                <p className={style.mealTime}>
                                    {meal.timeMeal}
                                </p>
                                <div className={style.productInformation}>
                                    <div>
                                        {meal.description?.map(
                                            (item, descIndex) => (
                                                <div
                                                    key={descIndex}
                                                    className={style.planName}
                                                >
                                                    <p>{item.name}</p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div>
                                        {meal.description?.map(
                                            (item, descIndex) => (
                                                <div
                                                    key={descIndex}
                                                    className={
                                                        style.productWeight
                                                    }
                                                >
                                                    <p>{item.weight}</p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionPrograms;
