import { useEffect } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import Carousel from '@/src/components/carousel'
import styles from './dex.module.css'
import { client } from '@/src/lib/apollo'
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from '@/src/generated/generated'
import { NextPage } from 'next'

const Pokedex: NextPage<{ data: PublishedEventsQuery['publishedEvents'] }> = ({
  data,
}) => {
  useEffect(() => {
    // Initialize GSAP
    const tl = gsap.timeline()

    // Initial state (closed)
    tl.set('.animate-1', { y: 80 })
      .set('.animate-3', { y: -80 })
      .set('.carousel-container', { opacity: 0 })

    // Opening animation
    tl.to('.animate-1', { y: 0, duration: 2 })
      .to('.animate-3', { y: 0, duration: 2 }, '<')
      .to('.carousel-container', { opacity: 1, duration: 2 }, '<')

    // Optionally, you can add more animations here.
  }, [])

  return (
    <>
      <div className="bg-black page-container h-screen relative">
        {/* Pokedex background */}
        <div className="h-full w-full flex flex-col justify-center items-center relative animation-container z-0">
          {/* Top part of Pokedex */}
          <div>
            <Image
              src="/assets/svg/dextop.svg"
              alt="dexmid"
              width={2491}
              height={1082}
              className="md:w-80 aspect-[2491/1082] top-5 animate-1 relative z-[1]"
            />
          </div>

          {/* Carousel at the center */}
          <div className="flex flex-col overflow-x-clip lg:overflow-x-visible justify-center items-center relative z-0 ">
            {/* Carousel */}
            <div className="md:w-80 relative z-0 bg-[#E1FDFA] flex flex-col justify-center items-center p-[10px]">
              {/* Your carousel content goes here */}
              <div className="w-full h-full relative bg-blue-500 rounded-xl flex flex-col items-center ">
                <Carousel />
              </div>
            </div>
          </div>

          {/* Bottom part of Pokedex */}
          <div>
            <Image
              src="/assets/svg/dexbot.svg"
              alt="dexmid"
              width={2491}
              height={1082}
              className="md:w-80 aspect-[2491/1022] bottom-10 animate-3 relative"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Pokedex
