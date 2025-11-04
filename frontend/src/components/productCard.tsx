'use client';

import { useState } from 'react';
import Image from 'next/image';
import style from '@/style/productsPage.module.scss';
import productPhoto from '@/assets/productCandy.png';
import { addToCart } from '../../api/cart.api.js';
import { getClientId } from '../../utils/clientId.utils.js';
import {ProductCardProps} from '../../inerface/product.interface.js';
export default function ProductCard({ product }:ProductCardProps) {
    const [count, setCount] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const clientId = getClientId()
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            await addToCart({
                clientId,
                name: product.name,
                productId: product.productId,
                quantity: count,
                price: product.price,
                weight: product.weight ?? 0
            });
            alert('Товар додано в кошик!');
            // console.log(`Added to cart: clientId=${clientId}, productId=${product.productId},productNam${product.name} quantity=${count} data=${JSON.stringify(product)}`);
            console.log('🧩 Client ID:', clientId);
            
        } catch (err) {
            console.error(err);
            alert('Помилка при додаванні товару');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className={style.product}>
            <Image src={product.imagePath ? `${API_URL}${product.imagePath}` : productPhoto} width={600} height={300} alt={product.name} />
            <div className={style.productDescription}>
                <h3>{product.name}</h3>
                <p>Склад: {product.Composition}</p>

                <div className={style.nutrition}>
                    <h3>Білки - {product.Proteins}</h3>
                    <h3>Жири - {product.Fats}</h3>
                    <h3>Вуглеводи - {product.Carbohydrates}</h3>
                    <h3>{product.Calories} ккал</h3>
                </div>

                <div className={style.priceCount}>
                    <div className={style.count}>
                        <span onClick={() => setCount(c => Math.max(1, c - 1))}>
                            -
                        </span>
                        <h3>{count}</h3>
                        <span onClick={() => setCount(c => c + 1)}>+</span>
                    </div>
                    <h3>{product.price*count} грн</h3>
                    <button
                        className={style.addToCart}
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Додається...' : 'Додати в кошик'}
                    </button>
                </div>
            </div>
        </div>
    );
}
