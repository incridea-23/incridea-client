import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './carousel.module.css'

const Carousel: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const carouselRef = useRef<HTMLUListElement>(null)

  const handleArrowClick = (direction: 'left' | 'right') => {
    const totalCards = cardImages.length
    console.log(totalCards)

    if (direction === 'left') {
      setActiveCard((prev) => (prev - 1 + totalCards) % totalCards)
    } else {
      setActiveCard((prev) => (prev + 1) % totalCards)
    }
    console.log('Current Active Card Index:', activeCard)

    setDirection(direction)
  }

useEffect(() => {
  if (carouselRef.current && direction) {
    const carousel = carouselRef.current

    // Assuming each image (plus its margin) takes up 100px
    const cardSize = 341 + 20

    if (direction === 'left') {
      carousel.scrollLeft -= cardSize
    } else if (direction === 'right') {
      carousel.scrollLeft += cardSize
    }


    console.log('Current Active Card Index:', activeCard)
    setDirection(null)
  }
}, [direction, activeCard])

  const cardImages = [
    'https://incridemo.web.app/events/CORE/robowars.png',
    'https://incridemo.web.app/events/CORE/robowars.png',
    'https://incridemo.web.app/events/CORE/StompThat.png',
    'https://incridemo.web.app/events/CORE/navarasa.png',
    'https://incridemo.web.app/events/CORE/Hogathon.png',
    'https://incridemo.web.app/events/CORE/navarasa.png',
    'https://incridemo.web.app/events/CORE/Hogathon.png',
    'https://incridemo.web.app/events/CORE/navarasa.png',
    'https://incridemo.web.app/events/CORE/Hogathon.png',
    'https://incridemo.web.app/events/CORE/navarasa.png',
    'https://incridemo.web.app/events/CORE/Hogathon.png',
  ]

  const displayedImages = [
    cardImages[(activeCard - 1 + cardImages.length) % cardImages.length],
    cardImages[activeCard],
    cardImages[(activeCard + 1) % cardImages.length],
  ]

  return (
    <div className=" w-[300%] flex justify-center items-center relative z-10">
      <div className={styles.wrapper}>
        <svg
          onClick={() => handleArrowClick('right')}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-move-left ${styles.icons} z-10 top-72 text-white`}
        >
          <path d="M6 8L2 12L6 16" />
          <path d="M2 12H22" />
        </svg>
        <ul
          ref={carouselRef}
          className={`${styles.carousel} flex justify-center items-center mx-5`}
        >
          {displayedImages.map((image, index) => {
            const isCurrentCardActive = index === 1 // Assuming the center card is the active card
            console.log(displayedImages.length)
            return (
              <li key={index} className={styles.card1 }>
                <div
                  className={`${styles.image_container} ${
                    isCurrentCardActive ? `${styles.active }` : ''
                  }`}
                >
                  <Image
                    height={400}
                    width={240}
                    src={image}
                    alt={`Card ${index + 1}`}
                    className="object-contain"
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <svg
          onClick={() => handleArrowClick('left')}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-move-right ${styles.icons} z-10 text-white`}
        >
          <path d="M18 8L22 12L18 16" />
          <path d="M2 12H22" />
        </svg>
      </div>
    </div>
  )
}

export default Carousel
