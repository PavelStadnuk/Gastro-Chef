'use client'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { ImageCarouselProps } from '../types/slider.interface'
import style from '../style//slider.module.css'

export const Sliker: React.FC<ImageCarouselProps> = ({
	masPhoto,
	settings,
}) => {
	return (
		<Slider {...settings} className={style.wrapper}>
			{masPhoto.map((photo, index) => (
                <div><Image alt='photo' src={photo} layout='responsive' objectFit='cover' />
                </div>
				
			))}
		</Slider>
	)
}
