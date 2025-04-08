'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from '../style/languageSwitcher.module.css';

const LanguageSwitcher = () => {
    const router = useRouter();
    const [activeLanguage, setActiveLanguage] = useState<string>('');

    useEffect(() => {
        // Отримуємо поточну мову з URL
        const pathSegments = window.location.pathname.split('/');
        setActiveLanguage(pathSegments[1] || 'ru'); // За замовчуванням "ru"
    }, []);

    const changeLanguage = (language: string) => {
        if (language !== activeLanguage) {
            router.push(`/${language}${window.location.pathname.substring(3)}`);
            setActiveLanguage(language); // Оновлюємо активну мову
        }
    };

    const LanguagesMas = ['uk', 'en', 'ru'];

    return (
        <div className={style.languages}>
            {LanguagesMas.map((language, index) => (
                <span
                    key={index}
                    className={`${style.languagesItem} ${
                        language === activeLanguage ? style.active : ''
                    }`}
                    onClick={() => changeLanguage(language)}
                >
                    {language}
                </span>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
