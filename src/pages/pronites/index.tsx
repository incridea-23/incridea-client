import { NextPage } from "next";
import Navbar from "../../components/navbar";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Pronite: NextPage = () => {
  const { status, user, error, loading } = useAuth();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".panel");

    // gsap.to(sections, {
    // xPercent: -100 * (sections.length - 1),
    // ease: "none",
    // scrollTrigger: {
    //     trigger: ".container",
    //     pin: true,
    //     scrub: 1,
    //     snap: 1 / (sections.length - 1),
    //     end: "+=3500",
    // }
    // });
    gsap.to(".containers", {
        xPercent: -100, 
        x: () => innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".containers",
          start: "top top",
          end: () => innerWidth * 3,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
      
  }, []);
  

  return (
    <>
        <div className="h-screen bg-gradient-to-bl overflow-x-auto overflow-y-hidden  from-indigo-200 via-sky-500 to-cyan-100">
            {/* Navbar */}
            {/* <Navbar status={status} user={user} /> */}
            <div className="relative h-screen w-[400vw] z-20 flex overflow-y-hidden text-gray-100">
                <div className="fixed -z-10 bottom-0 h-screen w-full bg-right-bottom bg-repeat-x bg-[url('/assets/svg/beach.svg')]" />
                <div className="fixed z-10 pointer-events-none bottom-0 h-[45rem] w-screen bg-bottom bg-repeat-x bg-[url('/assets/svg/bushes.svg')]" />
                <div className="h-screen w-screen flex justify-center items-center panel">
                    <motion.div
                        animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
                        transition={{ duration: 3 }}
                        className="flex flex-col w-full py-10 top-1/4 md:py-2 md:px-8 bg-black/50">
                        <h1 className="text-4xl text-center sm:text-6xl">PRONITES</h1>
                        <h2 className="text-2xl text-center sm:text-4xl">
                        These are the nights that never die.
                        </h2>
                    </motion.div>
                </div>
                <div className="h-screen w-screen panel">
                    <Image
                        className="h-screen w-screen "
                        src="/assets/svg/proBro.svg"
                        width={100}
                        height={1000}
                        alt="proBro"
                    />
                </div>
                <div className="h-screen w-screen panel">
                    <Image
                        className="h-screen w-screen"
                        src="/assets/svg/women.svg"
                        width={1000}
                        height={1000}
                        alt="women"
                    />
                </div>
                <div className="h-screen w-screen panel">
                    <Image
                        className="h-screen w-screen"
                        src="/assets/svg/raghav.svg"
                        width={1000}
                        height={1000}
                        alt="raghav"
                    />
                </div>
            </div>
            
        </div>
    </>
  );
};
export default Pronite;
