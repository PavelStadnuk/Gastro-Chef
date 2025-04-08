import Image from 'next/image';
import style from '../style/easyForBusy.module.scss';
import easy from '../assets/easy.png';
const EasyForBusy = () => {
  return (
    <div className={style.wrapperEasyForBusy}>
            <div className={style.easyForBusy}>
                <h1>«GastroChef - легко для занятых»</h1>
                <p>Долгое время я наблюдал как людям не хватает времени 
                для правильного и здорового питания, какое правильного, просто питания регуля</p>
                <p>Они могли позавтракать, в обед съесть что-то типа шаурмы или снэка, а вечером в силу голода наесться, что плохо сказывалось на их обмене веществ и естественно здоровье. </p>
                <p>Желание хоть как-то изменить ситуацию и помочь людям не давало мне покоя и я решил открыть доставку 
                еды правильного питания. </p>
                <p>Желание хоть как-то изменить ситуацию и помочь людям не давало мне покоя и я решил открыть доставку 
                еды правильного питания. </p>
            </div>
            <div className={style.imageEasyForBusy}>
                <Image src={easy} alt='History GastroChef' />
            </div>
        </div>
  );
}
export default EasyForBusy;