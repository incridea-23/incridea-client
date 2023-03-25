// @refresh reset
import useParallax from '@/src/hooks/useParallax';
import { titleFont } from '@/src/utils/fonts';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';
import React from 'react';
import CharacterAnimation from '../animation/character';
import TextAnimation from '../animation/text';

const Hero: React.FC<{
  ref: React.RefObject<HTMLDivElement>;
}> = ({ ref }) => {
  const { RiveComponent: LandingBg } = useRive({
    src: `assets/rive/landing-scene-bg.riv/`,
    stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  const { RiveComponent: LandingWave } = useRive({
    src: `assets/rive/landing-scene-wave.riv/`,
    stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  const transformBg = useParallax(ref, 7);
  const transformTitle = useParallax(ref, 10);

  return (
    <section className="relative bg-gradient-to-bl -z-10  from-yellow-100 to-sky-400">
      {/* sun Rays */}
      <motion.div
        className="absolute -z-10  top-0 left-0   "
        style={{ y: transformBg }}
      >
        <LandingBg className="w-screen  h-screen " />
      </motion.div>
      <motion.div
        style={{ y: transformTitle }}
        className="absolute  top-0 right-0 -z-10 backdrop-blur-[1.5px] text-white flex flex-col justify-center items-center w-screen min-h-screen"
      >
        <CharacterAnimation
          text="INCRIDEA"
          // make responsive text size
          textStyle="lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold"
          className={titleFont.className}
        />
        <TextAnimation
          text="Tides Of Change"
          textStyle="text-xl font-semibold"
        />
      </motion.div>
      <LandingWave className="w-auto h-screen z-0" />
    </section>
  );
};

export default Hero;
