import { NextPage } from 'next';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import ProniteFooter from '../../components/proniteFooter';

import {
  useHorizontalScroll,
  useHorizontalTouch,
} from '../../hooks/useHorizontal';
import CharacterAnimation from '@/src/components/animation/character';
import TextAnimation from '@/src/components/animation/text';

const Pronite: NextPage = () => {
  const scrollRef = useHorizontalScroll();
  useHorizontalTouch(scrollRef);
  return (
    <>
      <div className="relative h-screen bg-gradient-to-bl   overflow-y-hidden  from-indigo-200 via-sky-500 to-cyan-100">
        {/* Beach bg */}
        <div className="fixed top-0 bottom-0 h-screen w-full bg-right-bottom bg-repeat-x bg-[url('/assets/svg/beach.svg')]" />
        {/* Bushes bg */}
        <div className="fixed z-10 pointer-events-none bottom-0 h-[45rem] w-screen bg-bottom bg-repeat-x bg-[url('/assets/svg/bushes.svg')]" />
        <div
          ref={scrollRef}
          className="absolute top-0 snap-start snap-x snap-mandatory flex overflow-x-auto h-screen w-screen mx:auto overflow-y-hidden text-gray-100"
        >
          <div className="snap-start min-w-full h-screen place-items-center w-screen">
            <div className="absolute flex pointer-events-none flex-col w-full py-10 md:py-2 md:px-8 top-1/4">
              <CharacterAnimation
                text="PRONITES"
                className={`titleFont flex justify-center`}
                textStyle="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] text-4xl text-center sm:text-6xl"
              />
              <TextAnimation
                text="These are the nights that never die."
                className={`titleFont flex justify-center flex-wrap`}
                textStyle="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] text-2xl text-center sm:text-4xl"
              />
            </div>
          </div>
          <div className="snap-start min-w-full h-screen place-items-center w-screen">
            <Image
              className="relative h-screen w-screen -bottom-10 sm:bottom-0"
              src="/assets/svg/proBro.svg"
              width={100}
              height={1000}
              alt="proBro"
            />
          </div>
          <div className="snap-start min-w-full h-screen place-items-center w-screen">
            <Image
              className="relative h-screen w-screen -bottom-10 sm:bottom-0"
              src="/assets/svg/women.svg"
              width={1000}
              height={1000}
              alt="women"
            />
          </div>
          <div className="snap-start min-w-full h-screen place-items-center w-screen">
            <Image
              className="relative h-screen w-screen -bottom-10 sm:bottom-0"
              src="/assets/svg/raghav.svg"
              width={1000}
              height={1000}
              alt="raghav"
            />
          </div>
          <div className="snap-start min-w-full h-screen place-items-center w-screen">
            <Image
              className="h-screen w-screen"
              src="/assets/svg/iboard.svg"
              width={1000}
              height={1000}
              alt="rules"
            />
          </div>
          <div className="snap-start min-w-full h-screen place-items-center w-screen">
            <ProniteFooter className="relative h-screen w-screen -bottom-4 sm:bottom-0" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Pronite;
