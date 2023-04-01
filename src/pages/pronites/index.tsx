import { NextPage } from "next";
import Navbar from "../../components/navbar";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import React from "react";
import { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Image from "next/image";

const Pronite: NextPage = () => {
  const { status, user, error, loading } = useAuth();
  return (
    <div className="bg-gradient-to-bl overflow-x-auto overflow-y-hidden  from-indigo-200 via-sky-500 to-cyan-100">
      <div className="relative   w-[400vw]  z-20 flex  overflow-y-hidden   text-gray-100 ">
        {/* beaches svg */}
        <div className="fixed -z-10 bottom-0 h-screen w-full bg-right-bottom bg-repeat-x bg-[url('/assets/svg/beach.svg')]" />
        {/* bushes svg */}
        <div className="fixed z-10 pointer-events-none bottom-0 h-[45rem] w-screen bg-bottom bg-repeat-x bg-[url('/assets/svg/bushes.svg')]" />

        <div className=" h-screen w-screen flex justify-center items-center text-gray-100">
          <motion.div
            animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
            transition={{ duration: 3 }}
            className="absolute z-5 flex flex-col w-full py-10 top-1/4 md:py-2 md:px-8">
            <h1 className="text-4xl text-center sm:text-6xl">PRONITES</h1>
            <h2 className="text-2xl text-center sm:text-4xl">
              These are the nights that never die.
            </h2>
          </motion.div>
        </div>
        <div className=" text-orange-400">
          <Image
            className="h-full w-screen "
            src="/assets/svg/proBro.svg"
            width={100}
            height={1000}
            alt="proBro"
          />
        </div>
        <div className=" h-screen w-screen text-orange-400">
          <Image
            className="h-screen w-auto"
            src="/assets/svg/women.svg"
            width={1000}
            height={1000}
            alt="women"
          />
        </div>
        <div className=" h-screen w-screen text-orange-400">
          <Image
            className="h-screen"
            src="/assets/svg/raghav.svg"
            width={1000}
            height={1000}
            alt="raghav"
          />
        </div>
      </div>
    </div>
  );
};
export default Pronite;
