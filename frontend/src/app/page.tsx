
import fishLunch from '@/assets/fishunch.png'
import lunch from '@/assets/lunch.png'
import mango from '@/assets/mango.png'
import manLunch from '@/assets/manLunch.png'
import Main from '@/components/main'
import MainSlider from '@/components/mainSlider'
import NutritionPrograms from '@/components/nutritionPrograms'
import OrderAndFAQ from '@/components/orderAndFAQ'

export default function Home() {
	const mainInformtion = [
		{ text: 'Detox программа –  вкусное очищение организма ', image: mango },
		{ text: 'Сервис правильного питания Худей быстро', image: lunch },
		{
			text: 'Доверьтесь профессионалам. Я Кобылинский Кирилл - основатель. ',
			image: fishLunch,
		},
		{
			text: 'Кето питание - вкусное и экстремальное быстрое похудение',
			image: manLunch,
		},
	]
	return (
		<div>
			<Main mainInformation={mainInformtion} />
			<NutritionPrograms />
			<MainSlider />
            <OrderAndFAQ/>
		</div>
	)
}
