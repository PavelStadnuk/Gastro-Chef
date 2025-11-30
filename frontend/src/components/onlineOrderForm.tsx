'use client';

import { useForm } from 'react-hook-form';
import style from '../style/onlineOrderForm.module.scss';
import { createUser, updateUser, getUser } from '../../api/user.api.js';
import { getCart, clearCart } from '@/../api/cart.api.js';
import { createOrder } from '@/../api/order.api.js';
import { createOrderRaw } from '@/../api/orderRaw.api.js';
import { getClientId } from '@/../utils/clientId.utils';
import { FormValuesInterface } from '../../inerface/onlineOrderForm.interface.js';


const OnlineOrderForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValuesInterface>();
    const clientId = getClientId();
    const onSubmit = async (data: FormValuesInterface) => {
        try {
        
            const newUser = await createUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: `${data.street}, ${data.house}${
                    data.floor ? ', поверх ' + data.floor : ''
                }${data.apartment ? ', кв. ' + data.apartment : ''}${
                    data.entrance ? ', парадний ' + data.entrance : ''
                }${data.intercom ? ', домофон ' + data.intercom : ''}`
            });
            

    
            const cart = await getCart(clientId); 
            
            const products = Object.entries(cart.products || {}).map(
                ([id, item]: any) => ({
                    productId: id,
                    ...item
                })
            );

            if (products.length === 0) {
                alert('Кошик порожній');
                return;
            }
            
            const orderData = {
                clientId:newUser.userId,
                programPlanId: 1, 
                dateAdd: new Date().toISOString().split('T')[0],
                paymentMethod: data.paymentMethod,
                howConnectWithYou: data.contact,
                whereHearAboutUs: data.wishes || '',
                price: products.reduce(
                    (sum, p) => sum + p.price * p.quantity,
                    0
                )
            };
            const order = await createOrder(orderData);
            

            for (const p of products) {
                const orderRawData = {
                    orderId: order.orderId,
                    productId: Number(p.productId),
                    providerId: 1, // тимчасово фіксований
                    dayToDeliver: new Date().toISOString().split('T')[0],
                    timeToDeliver: data.deliveryTime || '',
                    status: 'pending',
                    weight: p.weight * p.quantity, 
                    price: p.price * p.quantity, 
                    count: p.quantity
                };

                

                const result = await createOrderRaw(orderRawData);
                
            }

        
            await clearCart(clientId); 
            
            alert('Замовлення успішно створено!');
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Сталася помилка при створенні замовлення');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.formContainer}>
                <div>
                    <input
                        placeholder="Ім’я"
                        {...register('name', { required: 'Обовʼязкове поле' })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        placeholder="Телефон"
                        {...register('phone', { required: 'Обовʼязкове поле' })}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <div>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register('email', { required: 'Обовʼязкове поле' })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className={style.addressMain}>
                    <div className={style.streetInput}>
                        <input
                            placeholder="Вулиця"
                            {...register('street', {
                                required: 'Обовʼязкове поле'
                            })}
                            
                        />
                        {errors.street && <p>{errors.street.message}</p>}
                    </div>

                    <div className={style.houseInput}>
                        <input
                            placeholder="Дім"
                            {...register('house', {
                                required: 'Обовʼязкове поле'
                            })}
                            
                        />
                        {errors.house && <p>{errors.house.message}</p>}
                    </div>
                    <div className={style.floorInput}><input placeholder="Поверх" {...register('floor')}  /></div>
                </div>

                <div className={style.addressDetails}>
                    
                    <input placeholder="Квартира" {...register('apartment')} />
                    <input placeholder="Парадний" {...register('entrance')} />
                    <input placeholder="Домофон" {...register('intercom')} />
                </div>


                <div>
                    <label className={style.checkboxLabel}>
                        
                        <input
                            type="checkbox"
                            {...register('agree', {
                                required: 'Необхідно погодитись з умовами'
                            })}
                        /> Згоден з <span>умовами співпраці</span>
                    </label>
                </div>
                <button type="submit">Надіслати</button>
            </div>

            <div className={style.formContainer}>
                <div>
                    <input
                        type="number"
                        {...register('weeks', { required: true, min: 1 })}
                        placeholder="кількість неділь"
                    />
                </div>
                <div>
                    <select {...register('deliveryTime')} required>
                        <option value="">Оберіть час</option>
                        <option value="morning">08:00 – 12:00</option>
                        <option value="day">12:00 – 17:00</option>
                        <option value="evening">17:00 – 22:00</option>
                    </select>
                </div>

                <div>
                    <select {...register('paymentMethod')} required>
                        <option value="">Оберіть спосіб</option>
                        <option value="cash">Готівка</option>
                        <option value="card">Картка</option>
                        <option value="online">Онлайн-оплата</option>
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        {...register('contact', { required: true })}
                        placeholder="Як з Вами звʼязатись"
                    />
                </div>

                <div>
                    <input
                        {...register('wishes')}
                        placeholder="Звідки дізналися про нас"
                    />
                </div>
            </div>
        </form>
    );
};

export default OnlineOrderForm;
