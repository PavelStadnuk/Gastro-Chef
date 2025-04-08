import DropdownSelect from './dropdownSelect';
import OrderForm from './orderForm';
import style from '../style/orderAndFAQ.module.css';
const OrderAndFAQ = () => {
    const options = [
        {
            name: 'Как осуществляется доставка правильного питания?',
            description:
                'Доставка осуществляется через курьерскую службу, которая привозит еду на дом или в офис.'
        },
        {
            name: 'Что такое правильное питание?',
            description:
                'Правильное питание — это сбалансированный рацион, включающий все необходимые макро- и микроэлементы.'
        },
        {
            name: 'Какие у вас способы оплаты?',
            description:
                'Мы принимаем оплату картами, через онлайн-банкинг, а также наличными при доставке.'
        },
        {
            name: 'Можно ли заказать пробный день?',
            description:
                'Да, вы можете заказать пробный день с доставкой в удобное время. Пробный день включает полный рацион на день.'
        }
    ];

    return (
        <div className={style.orderAndFAQWrapper}>
            <div className={style.orderWrapper}>
                <div className={style.order}>
                    <h1>Оформить заказ</h1>
                    <h3>
                        Обсудите все детали заказа по телефону,
                        <br />
                        или сами укажите все подробности онлайн
                    </h3>
                </div>
                <OrderForm />
            </div>
            <div>
                <h1>Часто задаваемые вопросы</h1>
                <DropdownSelect options={options} />
            </div>
        </div>
    );
};
export default OrderAndFAQ;
