// @refresh reset
import { type NextPage } from "next";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import Parallax from "../components/animation/parallax";
import CountDown from "../components/countdown";
import About from "../components/about";
import GalleryPeek from "../components/galleryPeek";
import Image from "next/image";

import { useRef } from "react";
import useParallax from "../hooks/useParallax";
import { titleFont } from "../utils/fonts";
const Home: NextPage = () => {
  const { RiveComponent: LandingBg } = useRive({
    src: `assets/rive/landing-scene-bg.riv/`,
    stateMachines: ["state-machine"],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  const { RiveComponent: LandingWave } = useRive({
    src: `assets/rive/landing-scene-wave.riv/`,
    stateMachines: ["state-machine"],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  const ref = useRef(null);
  const transformBg = useParallax(ref, 7);
  const transformTitle = useParallax(ref, 10);
  const { status, user, error, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Loading page here
  if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div ref={ref} className="overflow-x-hidden">
      <Navbar status={status} user={user} />

      <div className="relative bg-gradient-to-bl -z-10  from-yellow-100 to-sky-400">
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
          <h1 className={`${titleFont.className} text-7xl `}>INCRIDEA</h1>
          <p className="text-xl font-semibold">Tides Of Change</p>
        </motion.div>
        <LandingWave className="w-auto h-screen z-0" />
      </div>
      <div className="relative bg-gradient-to-b h-[300vh] from-[#5CA3AD]  via-[#2b8da2] to-[#2b8da2]">
        {/* Body */}
        <div className="h-[200px]"></div>
        <CountDown />
        <About />
        <GalleryPeek />
        <Image
          className="absolute bottom-0 w-screen h-auto"
          src="/assets/svg/atlantis-ai.svg"
          alt=""
          height={500}
          width={1000}
        />
      </div>
    </div>
  );
};

export default Home;
function Sun() {
  return (
    <div className="w-40 h-40 rounded-full bg-yellow-400 relative">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full absolute ${
            index % 2 === 0 ? "bg-transparent" : "bg-yellow-500"
          }`}
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${index * 45}deg) translateY(-50%)`,
            background: `linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)`,
          }}
        />
      ))}
    </div>
  );
}
