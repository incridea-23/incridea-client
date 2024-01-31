import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Carousel from "@/src/components/slider";
import { IoMdClose } from "react-icons/io";
import useStore from "../store/store";

const Pokedex = () => {
  const setEventDex = useStore((state) => state.setSponsor);
  const eventDex = useStore((state) => state.sponsor);
  useEffect(() => {
    // Initialize GSAP
    const tl = gsap.timeline();

    // Initial state (closed)
    tl.set(".animate-1", { y: 80 })
      .set(".animate-3", { y: -80 })
      .set(".carousel-container", { opacity: 0 });

    // Opening animation
    tl.to(".animate-1", { y: -20, duration: 2, delay: 1 })
      .to(".animate-3", { y: 40, duration: 2 }, "<")
      .to(".carousel-container", { opacity: 1, duration: 1, delay: 1 }, "<");

    // Optionally, you can add more animations here.
  }, []);

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute top-5 right-5 cursor-pointer bg-red-600 px-2 py-1 rounded-sm z-50"
        style={{ pointerEvents: eventDex ? "all" : "none" }}
        onClick={setEventDex}
      >
        <IoMdClose className="text-lg text-white" />
      </div>
      <div className="page-container h-screen relative">
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
          <div className="flex flex-col overflow-x-clip lg:overflow-x-visible justify-center items-center relative z-0 w-full">
            {/* Carousel */}
            <div className="md:w-80 w-full relative z-0 bg-[#E1FDFA] flex flex-col justify-center p-[10px] ">
              {/* Your carousel content goes here */}
              <div className="w-full h-[43vh] relative bg-blue-500 rounded-xl flex flex-col items-center carousel-container">
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
    </div>
  );
};

export default Pokedex;
