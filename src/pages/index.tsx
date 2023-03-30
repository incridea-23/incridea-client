import { type NextPage } from "next";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import CountDown from "../components/countdown";
import About from "../components/about";
import Image from "next/image";
import { useRef } from "react";
import Hero from "../components/hero";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import EventsReel from "../components/eventsPeek/reel";

const Home = ({ setLoading }: { setLoading: (loading: boolean) => void }) => {
  const ref = useRef(null);
  const { status, user, error, loading } = useAuth();
  const containerRef = useRef(null);

  if (loading) return <div>Loading...</div>; // Loading page here
  //if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div ref={ref} className="overflow-x-hidden">
      <Navbar status={status} user={user} />
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          smartphone: {
            smooth: true,
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

          <div
            data-scroll-section
            className="relative -mt-2 bg-gradient-to-b h-[350vh] from-[#46aacf]  via-indigo-400 to-[#2b8da2]">
            <div className="h-[200px]"></div>

            {/* 2. Countdown Section */}
            <CountDown />

            {/* 3. About Section */}
            <About />

            {/* 4. Gallery Reel Section */}
            <EventsReel />

            {/* 5. Footer Section */}
            <section>
              <Image
                className="absolute bottom-0 w-screen h-auto"
                src="/assets/svg/atlantis-ai.svg"
                alt=""
                height={500}
                width={1000}
              />
            </section>
          </div>
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
};

export default Home;
