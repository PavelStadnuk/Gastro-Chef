'use client';
import { useEffect, useRef, useState } from 'react';
import style from '@/style/cart.module.scss';
import OnlineOrderForm from './onlineOrderForm';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { getCart, clearCart, updateQuantity } from '../../api/cart.api.js';
import { getClientId } from '../../utils/clientId.utils.js';

const Cart = ({ close }: { close: () => void }) => {
    const clientId = getClientId();
    const popupRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(popupRef, () => close());
    const [cart, setCart] = useState<{ products: Record<string, any> }>({
        products: {}
    });
    const [openComponent, setOpenComponent] = useState(false);

    const fetchCart = async () => {
        try {
            const data = await getCart(clientId);
            setCart(data);
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [clientId]);

    const handleQuantityChange = async (
        productId: string,
        newQuantity: number
    ) => {
        try {
            const updated = await updateQuantity(
                clientId,
                productId,
                newQuantity
            );
            setCart(updated.cart);
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const handleClear = async () => {
        await clearCart(clientId);
        setCart({ products: {} });
    };

    const products = Object.entries(cart.products || {}).map(([id, item]) => ({
        id,
        ...item
    }));

    const totalPrice = products.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
    );
    const totalCount = products.reduce((acc, p) => acc + p.quantity, 0);

    return (
        <div className={style.cartWrapper} ref={popupRef}>
            {openComponent ? (
                <OnlineOrderForm />
            ) : (
                <div className={style.cart}>
                    <div className={style.cartProducts}>
                        {products.length > 0 ? (
                            products.map(product => (
                                <div
                                    key={product.id}
                                    className={style.cartProduct}
                                >
                                    <h4>{product.name}</h4>
                                    <div className={style.cartProductInfo}>
                                        <div className={style.cartProductCount}>
                                            <span
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        product.id,
                                                        product.quantity - 1
                                                    )
                                                }
                                            >
                                                -
                                            </span>
                                            <p>{product.quantity}</p>
                                            <span
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        product.id,
                                                        product.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        </div>
                                        <div className={style.cartProductPrice}>
                                            <p>
                                                {product.price *
                                                    product.quantity}{' '}
                                                грн
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Кошик порожній 🛒</p>
                        )}
                    </div>

                    {products.length > 0 && (
                        <>
                            <div className={style.orderWrapper}>
                                <button onClick={() => setOpenComponent(true)}>
                                    Онлайн заказ
                                </button>
                                <div className={style.orderInfo}>
                                    {totalCount} шт / {totalPrice} грн
                                </div>
                            </div>

                            <button
                                className={style.clearBtn}
                                onClick={handleClear}
                            >
                                Очистити кошик
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
