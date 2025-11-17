'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png';
import style from '../style/header.module.css';
import cart from '../assets/cart.svg';
import { useState } from 'react';
import Cart from './cart';
const Header = () => {
    // const categorys = [
    //     'Програми питания',
    //     'Бизнес-ланчи',
    //     'Gastro Shop',
    //     'О нас',
    //     'Блог',
    // ];

    const categorys = [
        { name: 'Nutrition programs', link: '/' },
        { name: 'Products', link: '/categories' },
        { name: 'Gastro Shop', link: '/' },
        { name: 'About Us', link: '/aboutus' },
        { name: 'Blog', link: '/news/page/1' }
    ];

    const [isCartOpen, setIsCartOpen] = useState(false);


    return (
        <header className={style.wrapper}>
            <div className={style.logo}>
                <Image alt="logo" src={logo} />
            </div>
            <div>
                <div className={style.links}>
                    {categorys.map((category,index) => {
                        return (
                            <Link href={category.link} key={index}>
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
                {/* <LanguageSwitcher /> */}
            </div>

            <div className={style.telephone}>
                <p>+380 (685) 33-35-29</p>
            </div>
            <div
                className={style.cart}
                onClick={() => setIsCartOpen(!isCartOpen)}
            >
                <Image
                    alt="cart"
                    src={cart}
                    width={42}
                    height={42}
                    className={style.cartImage}
                />
                {/* <span className={style.cartCount}>0</span> */}
            </div>
            {isCartOpen && <Cart close={()=>setIsCartOpen(false)} />}
        </header>
    );
};
export default Header;
