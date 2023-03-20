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

import { useRef } from "react";
import useParallax from "../hooks/useParallax";
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
  const transformBg = useParallax(ref, 10);

  const { status, user, error, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Loading page here
  if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div ref={ref} className="overflow-x-hidden">
      <Navbar status={status} user={user} />
      <div className="relative">
        <motion.div
          className="absolute top-0 left-0 -z-10 bg-gradient-to-bl from-yellow-100 to-sky-400 "
          style={{ y: transformBg }}>
          <LandingBg className="w-screen  h-screen " />
        </motion.div>
        <LandingWave className="w-auto h-screen " />
      </div>
      <div className="bg-gradient-to-b h-[300vh] from-[#5CA3AD] to-[#1b5b94]">
        {/* Body */}
        <div className="h-[200px]"></div>
        <CountDown />
        <Parallax parentRef={ref} speed={3}>
          <About />
        </Parallax>
        <GalleryPeek />
      </div>
    </div>
  );
};

export default Home;
