import { StaticImageData } from 'next/image'
export interface ImageCarouselProps {
	masPhoto: StaticImageData[]
	settings: {
		dots: boolean
		infinite: boolean
		slidesToShow: number
		slidesToScroll: number
		autoplay: boolean
		speed: number
		autoplaySpeed: number
		cssEase: string
        className:string

	}
}
