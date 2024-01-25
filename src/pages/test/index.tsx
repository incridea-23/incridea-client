import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import {
  useHorizontalScroll,
  useHorizontalTouch,
} from '../../hooks/useHorizontal'
import styles from './dex.module.css'

gsap.registerPlugin(ScrollTrigger)

const Index = () => {
  useEffect(() => {
    const animate1 = gsap.to('.animate-1', {
      y: 80,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-1',
        start: 'center center',
        end: 'center center',
        toggleActions: 'play reverse none play',
        markers: {
          startColor: 'red',
          endColor: 'blue',
          fontSize: '1rem',
        },
      },
    })

    const animate3 = gsap.to('.animate-3', {
      y: -80,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-1',
        start: 'center center',
        end: 'center 50%',
        toggleActions: 'play reverse none play',
        markers: {
          startColor: 'red',
          endColor: 'blue',
          fontSize: '1rem',
        },
      },
    })

    const animate2 = gsap.to('.animate-1', {
      y: 80,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-3',
        start: 'center center',
        end: 'top 50%',
        toggleActions: 'play play reverse reverse',
        markers: {
          startColor: 'red',
          endColor: 'blue',
          fontSize: '1rem',
        },
      },
    })

    const animate4 = gsap.to('.animate-3', {
      y: -80,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-3',
        start: 'center center',
        end: 'top 50%',
        toggleActions: 'play play reverse reverse',
        markers: {
          startColor: 'red',
          endColor: 'blue',
          fontSize: '1rem',
        },
      },
    })
    

  }, [])

  const scrollRef = useHorizontalScroll()
  useHorizontalTouch(scrollRef)

  return (
    <>
      <div className="bg-red-200 h-screen"></div>
      <div className="bg-black page-container h-screen relative">
        <div className="h-full w-full flex flex-col justify-center items-center relative animation-container">
          <Image
            src="/assets/svg/dextop.svg"
            alt={'dexmid'}
            width={2491}
            height={1082}
            className="md:w-80 aspect-[2491/1082] -mb-2 animate-1 relative z-[1]"
          />
          <div className="w-full md:w-80 relative z-0">
            <div
              ref={scrollRef}
              className={`bg-[#E1FDFA] h-[50vh] w-full md:w-80 animate-2 p-4 snap-mandatory snap-center overflow-x-scroll snap-x flex ${styles.scrolllbarhid}`}
            >
              <div className="h-full w-full snap-center min-w-full place-items-center bg-blue-500 rounded-lg box1 mx-0"></div>
              <div className="h-full w-full snap-center min-w-full place-items-center bg-blue-500 rounded-lg box2 ml-4"></div>
              <div className="h-full w-full snap-center min-w-full place-items-center bg-blue-500 rounded-lg box3 ml-4"></div>
            </div>
          </div>
          <Image
            src="/assets/svg/dexbot.svg"
            alt={'dexmid'}
            width={2491}
            height={1082}
            className="md:w-80 aspect-[2491/1022] -mt-6 animate-3 relative"
          />
        </div>
      </div>
      <div className="bg-blue-200 h-screen"></div>
    </>
  )
}

export default Index
