import fishLunch from '@/assets/fishunch.png';
import lunch from '@/assets/lunch.png';
import mango from '@/assets/mango.png';
import manLunch from '@/assets/manLunch.png';
import HistoryGastroChef from '@/components/historyGastroChef';
import Main from '@/components/main';
import MainSlider from '@/components/mainSlider';
import OrderAndFAQ from '@/components/orderAndFAQ';
import Image from 'next/image';
import aurPhoto from '@/assets/aurTeam.png';
import EasyForBusy from '@/components/easyForBusy';
import style from '@/style/aboutUs.module.scss';
export default function Aboutus() {
    const mainInformtion = [
        {
            text: 'Detox программа –  вкусное очищение организма ',
            image: mango
        },
        { text: 'Сервис правильного питания Худей быстро', image: lunch },
        {
            text: 'Доверьтесь профессионалам. Я Кобылинский Кирилл - основатель. ',
            image: fishLunch
        },
        {
            text: 'Кето питание - вкусное и экстремальное быстрое похудение',
            image: manLunch
        }
    ];
    return (
        <div className={style.wrapperAboutUs}>
            <Main mainInformation={mainInformtion} />
            <HistoryGastroChef />
            <Image src={aurPhoto} alt="aurPhoto" className={style.aurPhoto} />
            <EasyForBusy />
            <MainSlider />
            <OrderAndFAQ />
        </div>
    );
}
