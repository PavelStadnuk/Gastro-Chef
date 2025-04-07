import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png';
import style from '../style/header.module.css';
import LanguageSwitcher from './languageSwitcher';
import { useTranslations } from 'next-intl'
const Header = () => {
    // const categorys = [
    //     'Програми питания',
    //     'Бизнес-ланчи',
    //     'Gastro Shop',
    //     'О нас',
    //     'Блог',
    // ];
    const t = useTranslations('Home')
    const categorys = [
        t('Nutrition programs'),
        t('Business lunches'),
        t('Gastro Shop'),
        t('About Us'),
        t('Blog'),  
    ];
    return (
        <header className={style.wrapper}>
            <div className={style.logo}>
                <Image alt='logo' src={logo} />
            </div>
            <div>
                <div className={style.links}>
                    {categorys.map(category => {
                        return (
                            <Link href='#' key={category}>
                                {category}
                            </Link>
                        );
                    })}
                </div>
                <LanguageSwitcher/>
            </div>

            <div className={style.telephone}>
                <p>+380 (685) 33-35-29</p>
            </div>
        </header>
    );
};
export default Header;
