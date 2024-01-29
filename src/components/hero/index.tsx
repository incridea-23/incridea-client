// @refresh reset

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';
import React from 'react';
import TextAnimation from '../animation/text';
import Image from 'next/image';

const Hero: React.FC = () => {
  const { RiveComponent: LandingBg } = useRive({
    src: `assets/rive/landing-scene-bg-1.riv/`,
    stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  const { RiveComponent: LandingWave } = useRive({
    src: `assets/rive/landing-scene-wave-1.riv/`,
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
      style={{willChange: 'transform'}}
      className="relative bg-gradient-to-bl -z-10  from-indigo-200 via-sky-500 to-cyan-100"
    >
      {/* 1. Sun Rays */}
      <Image
        className="hidden md:block absolute  top-0 right-0 z-50 "
        data-scroll
        data-scroll-speed="2"
        src="/assets/png/lensflare.webp"
        width={1000}
        height={1000}
        alt="flare"
        priority
      />
      {/* 2. Background Animation */}
      <motion.div
        data-scroll
        data-scroll-speed="-8"
        className="absolute -z-10  top-9 md:top-0 left-0   "
      >
        <LandingBg className="h-[70vh] w-screen  md:h-screen " />
      </motion.div>

      {/* 3. Hero Title */}
      <motion.div
        data-scroll
        data-scroll-speed="-6"
        className="absolute  -top-20 md:top-0 right-0 -z-10 backdrop-blur-[1px] text-white flex flex-col justify-center items-center w-screen min-h-screen"
      >
        <Image
          className="w-full max-w-lg px-10 h-fit"
          src="/assets/png/logo.png"
          priority
          width={500}
          height={500}
          alt="INCRIDEA"
        />
        <TextAnimation
          text="Tides Of Change"
          textStyle={`titleFont drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] text-xl sm:text-3xl font-semibold tracking-widest`}
        />
      </motion.div>

      {/* 4. Foreground Animation */}
      <LandingWave className=" h-[75vh] w-screen  md:h-screen z-0" />
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
