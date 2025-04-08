import Image from 'next/image';
import history from '../assets/history.png';
import style from '../style/historyGastroChef.module.scss';
const HistoryGastroChef = () => {
    return (
        <div className={style.wrapperHistoryGastroChef}>
            <div >
                <Image src={history} alt='History GastroChef' />
            </div>
            <div className={style.historyGastroChef}>
                <h1>История GastroChef началась более 6-ти лет назад... </h1>
                <p>Долгое время я наблюдал как людям не хватает времени 
                для правильного и здорового питания, какое правильного, просто питания регулярного. </p>
                <p>Они могли позавтракать, в обед съесть что-то типа шаурмы или снэка, а вечером в силу голода наесться, что плохо сказывалось на их обмене веществ и естественно здоровье. </p>
                <p>Желание хоть как-то изменить ситуацию и помочь людям не давало мне покоя и я решил открыть доставку 
                еды правильного питания. </p>
                <p>Желание хоть как-то изменить ситуацию и помочь людям не давало мне покоя и я решил открыть доставку 
                еды правильного питания. </p>
                <h1>Знакомтесь! Команда GastroChef!</h1>
            </div>
        </div>
    );
};
export default HistoryGastroChef;