import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png';
import style from '../style/header.module.css';
import LanguageSwitcher from './languageSwitcher';
import { useTranslations } from 'next-intl';
const Header = () => {
    // const categorys = [
    //     'Програми питания',
    //     'Бизнес-ланчи',
    //     'Gastro Shop',
    //     'О нас',
    //     'Блог',
    // ];
    const t = useTranslations('Home');
    const categorys = [
        { name: t('Nutrition programs'), link: '/nutrition-programs' },
        { name: t('Business lunches'), link: '/business-lunches' },
        { name: t('Gastro Shop'), link: '/gastro-shop' },
        { name: t('About Us'), link: 'aboutus' },
        { name: t('Blog'), link: '/blog' }
    ];

    return (
        <header className={style.wrapper}>
            <div className={style.logo}>
                <Image alt="logo" src={logo} />
            </div>
            <div>
                <div className={style.links}>
                    {categorys.map(category => {
                        return (
                            <Link href={category.link} key={category.link}>
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
                <LanguageSwitcher />
            </div>

            <div className={style.telephone}>
                <p>+380 (685) 33-35-29</p>
            </div>
        </header>
    );
};
export default Header;
