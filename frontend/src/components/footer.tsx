import Image from 'next/image'
import Link from 'next/link'
import Facebook from '../assets/facebook.png'
import Instagram from '../assets/instagram.png'
import logo from '../assets/logoFooter.png'
import Telegram from '../assets/telegram.png'
import Viber from '../assets/viber.png'
import style from '../style/footer.module.css'
const Footer = () => {
	const contacts = [
		{ name: 'Instagram', link: Instagram },
		{ name: 'Facebook', link: Facebook },
		{ name: 'Telegram', link: Telegram },
		{ name: 'Viber', link: Viber },
	]
	const categorys = [
		'Програми питания',
		'Бизнес-ланчи',
		'Gastro Shop',
		'О нас',
		'Блог',
	]
	return (
		<footer className={style.wrapper}>
			<div className={style.links}>
				{categorys.map(category => {
					return (
						<Link href='#' key={category}>
							{category}
						</Link>
					)
				})}
			</div>
			<div>
				<Image alt='logo footer' src={logo} />
			</div>
			<div className={style.сontactSection}>
				<p>Условия сотрудничиства</p>
				<p>FAQ</p>
				<div className={style.contacts}>
					{contacts.map(contact => {
						return <Image alt={contact.name} src={contact.link} />
					})}
				</div>
				<p>+380 (685) 33-35-29</p>
			</div>
		</footer>
	)
}
export default Footer
