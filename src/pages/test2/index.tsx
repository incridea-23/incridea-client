import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Carousel from "@/src/components/slider";
import Link from "next/link";
import Button from "@/src/components/button";

const Pokedex = () => {
  useEffect(() => {
    // Initialize GSAP
    const tl = gsap.timeline();

    // Initial state (closed)
    tl.set(".animate-1", { y: 50 })
      .set(".animate-3", { y: -50 })
      .set(".carousel-container", { opacity: 0 })
      .set(".butanim", { opacity: 0});

    // Opening animation
    tl.to(".animate-1", { y: -20, duration: 2, delay: 1 })
      .to(".animate-3", { y: 40, duration: 2 }, "<")
      .to(".carousel-container", { opacity: 1, duration: 5, }, "<")
      .to(".butanim",{ opacity: 1, duration: 5})
  }, []);

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
          <div className="flex flex-col overflow-x-clip lg:overflow-x-visible justify-center items-center relative z-0 w-full">
            {/* Carousel */}
            <div className="md:w-80 w-full relative z-10 bg-[#B5FFF7] flex flex-col justify-center p-[10px] ">
              {/* Your carousel content goes here */}
              <div className="w-full min-h-[10vh] lg:min-h-[40vh] relative bg-blue-500 rounded-xl flex flex-col items-center carousel-container py-2">
                <Carousel />
                {/* Dex button inside the carousel container */}
                <Link
                  href={"/events"}
                  className="flex w-full justify-center relative z-20 px-2 -bottom-1 mb-2 butanim"
                >
                  <Button className="rounded-xl h-full">
                    View Events
                  </Button>
                </Link>
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
              className="md:w-80 aspect-[2491/1022] bottom-10 animate-3 relative z-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokedex;
