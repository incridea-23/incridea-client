// @refresh reset
import { type NextPage } from "next";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import Parallax from "../components/animation/parallax";
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

  const { status, user, error, loading } = useAuth();
  console.log(user);

  if (loading) return <div>Loading...</div>; // Loading page here
  if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div className="overflow-x-hidden">
      <Navbar status={status} user={user} />
      <div className="relative">
        <LandingBg className="absolute  top-0 left-0 -z-10 w-screen  h-screen bg-gradient-to-bl from-yellow-100 to-sky-400" />

        <LandingWave className="w-auto h-screen " />
      </div>
      <div className="bg-gradient-to-b h-[200vh] from-[#5CA3AD] to-[#1b5b94]">
        {/* Body */}
      </div>
    </div>
  );
};

export default Home;
