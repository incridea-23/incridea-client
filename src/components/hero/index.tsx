// @refresh reset
import { titleFont } from '@/src/utils/fonts';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';
import React from 'react';
import CharacterAnimation from '../animation/character';
import TextAnimation from '../animation/text';

const Hero: React.FC = () => {
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

  return (
    <section
      data-scroll-section
      className="relative bg-gradient-to-bl -z-10  from-yellow-100 to-sky-400"
    >
      {/* 1. Sun Rays */}

      {/* 2. Background Animation */}
      <motion.div
        data-scroll
        data-scroll-speed="-8"
        className="absolute -z-10  top-0 left-0   "
      >
        <LandingBg className="w-screen  h-screen " />
      </motion.div>

      {/* 3. Hero Title */}
      <motion.div
        data-scroll
        data-scroll-speed="-6"
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

      {/* 4. Foreground Animation */}
      <LandingWave className="w-auto h-screen z-0" />
    </section>
  );
};

function Sun() {
  return (
    <div className="w-40 h-40 rounded-full bg-yellow-400 relative">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full absolute ${
            index % 2 === 0 ? 'bg-transparent' : 'bg-yellow-500'
          }`}
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${index * 45}deg) translateY(-50%)`,
            background: `linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)`,
          }}
        />
      ))}
    </div>
  );
}

export default Hero;
