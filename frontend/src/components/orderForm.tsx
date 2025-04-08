'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from '../style/orderForm.module.css';
interface OrderFormInputs {
    name: string;
    phone: string;
    testDay: boolean;
    termsAccepted: boolean;
}

const OrderForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<OrderFormInputs>();

    const onSubmit: SubmitHandler<OrderFormInputs> = data => {
        console.log('Онлайн заказ:', data);
    };

    const handlePhoneOrder = () => {
        console.log(
            'Заказ по телефону:',
            'Користувач залишив заявку на дзвінок'
        );
        alert('Ми скоро вам зателефонуємо!');
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.wrapperOrderForm}
        >
            <div>
                <label
                    className={`${style.noError} ${
                        errors.name ? style.error : ''
                    }`}
                >
                    Name:
                </label>
                <div className={style.wrapperInput}>
                    <input
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: "Ім'я має містити мінімум 2 символи"
                            },
                            pattern: {
                                value: /^[A-Za-zА-Яа-яЁёІіЇїЄє'’ -]+$/,
                                message: "Некоректне ім'я"
                            }
                        })}
                        className={style.input}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    <span
                        className={`${style.marker} ${
                            errors.name ? style.errorSpan : ''
                        }`}
                    ></span>
                </div>
            </div>

            <div>
                <label
                    className={`${style.noError} ${
                        errors.phone ? style.error : ''
                    }`}
                >
                    Phone:
                </label>
                <div className={style.wrapperInput}>
                    <input
                        type="tel"
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^\+?[\d\s\-\(\)]+$/,
                                message: 'Некоректний номер телефону'
                            }
                        })}
                        className={style.input}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                    <span
                        className={`${style.marker} ${
                            errors.phone ? style.errorSpan : ''
                        }`}
                    ></span>
                </div>
            </div>

            <div>
                <label className={style.customCheckboxWrapper}>
                    <input
                        type="checkbox"
                        {...register('testDay')}
                        className={style.customCheckbox}
                    />
                    <p>Тест-день! Получить скидку -30%?</p>
                </label>
            </div>

            <div>
                <label className={style.customCheckboxWrapper}>
                    <input
                        type="checkbox"
                        {...register('termsAccepted', {
                            required: 'Вы должны согласиться с условиями'
                        })}
                        className={style.customCheckbox}
                    />
                    <p>Согласен с условиями сотрудничества</p>
                </label>
                {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
            </div>

            <div className={style.orderButton}>
                <button type="submit">Онлайн заказ</button>
                <h1>Или</h1>
                <button type="button" onClick={handlePhoneOrder}>
                    Заказ по телефону
                </button>
            </div>
        </form>
    );
};

export default OrderForm;
