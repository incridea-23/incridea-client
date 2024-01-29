import About from "../components/about";
import Image from "next/image";
import { useRef } from "react";
import Hero from "../components/hero";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import EventsReel from "../components/eventsPeek/reel";
import { HomePageFooter } from "../components/footer";
import dynamic from "next/dynamic";
import { BiQuestionMark } from "react-icons/bi";
import { BsEgg, BsEggFill } from "react-icons/bs";
import { useRouter } from "next/router";
const CountDown = dynamic(() => import("../components/countdown"), {
  ssr: false,
});

const Home = () => {
  const containerRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const router = useRouter();

  return (
    <div className="overflow-x-hidden" style={{ willChange: "transform" }}>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          smartphone: {
            smooth: !isMobile,
          },
          tablet: {
            smooth: true,
          },
        }}
        watch={[]}
        containerRef={containerRef}>
        <main data-scroll-container ref={containerRef}>
          {/* 1. Hero Section */}
          <Hero />

          <div data-scroll-section className="relative -mt-2  ">
            <div className="relative pt-[200px] w-full flex justify-center items-center bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
              {/* 2. Countdown Section */}
              <Image
                src="/assets/png/waterflare.png"
                height={1000}
                width={1000}
                alt="flare"
                className="absolute pointer-events-none opacity-40 z-50 top-0 right-0"
                priority
              />
              <CountDown />
            </div>
            {/* 3. About Section */}
            <div className=" bg-gradient-to-b pb-3 from-[#2d6aa6] -mt-2   to-[#052749]">
              <About />
              {/* 4. Core Events Section */}
              <EventsReel />
            </div>
            {/* 5. Footer Section */}
            <section className="-mt-2 relative bg-[#052749]">
              <div className="group absolute md:right-48 right-0 top-10 md:top-60 p-3 py-5">
                <div onClick={() => router.push('/easter-egg')} className="cursor-pointer relative w-fit mr-10">
                  <BsEggFill style={{rotate: '-6deg'}} className="transition-all  group-hover:animate-bounce text-5xl text-white/80 text-center mx-auto mt-10" />
                  <BiQuestionMark style={{rotate: '15deg'}} className="transition-all absolute -top-2 text-white/80 text-xl group-hover:animate-bounce  -right-1" />
                </div>
              </div>
              <HomePageFooter />
            </section>
          </div>
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
};

export default Home;
