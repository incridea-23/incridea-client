import { NextPage } from "next";
import Navbar from '../../components/navbar';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import React from "react";
import {useRef} from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import 'locomotive-scroll/dist/locomotive-scroll.css';

const Pronite: NextPage = () => {
    const { status, user, error, loading } = useAuth();
    return (
        <>
            <div className="h-screen w-full text-gray-100 bg-gradient-to-bl from-indigo-200 via-sky-500 to-cyan-100">
                {/* Navbar */}
                <Navbar status={status} user={user} />
                
                {/* beaches svg */}
                <div className="absolute z-5 bottom-0 h-screen w-full bg-right-bottom bg-repeat-x bg-[url('/assets/svg/beach.svg')]"/>
                {/* bushes svg */}
                <div className="absolute z-10 bottom-0 h-screen w-full bg-bottom bg-repeat-x bg-[url('/assets/svg/bushes.svg')]"/>
            </div>
            <div data-scroll-container className="absolute z-20 top-0 h-screen w-full overflow-x-auto overflow-y-hidden scroll-hide text-gray-100">
                <LocomotiveScrollProvider
                    options={{
                    smooth: true,
                    direction: "horizontal",
                    smartphone: {
                    smooth: true,
                    },
                    tablet: {
                    smooth: true,
                    },
                }}
                watch={[]}
                >
                        <div data-scroll-section className="h-screen w-screen text-gray-100">
                            <motion.div
                                animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
                                transition={{ duration: 3 }}
                                className="absolute z-5 flex flex-col w-full py-10 top-1/4 md:py-2 md:px-8"
                                >
                                <h1 className="text-4xl text-center sm:text-6xl">
                                    PRONITES
                                </h1>
                                <h2 className="text-2xl text-center sm:text-4xl">
                                    These are the nights that never die.
                                </h2>
                            </motion.div>
                        </div>
                        <div data-scroll-section className="z-10 h-screen w-screen text-orange-400">
                            <div className="h-screen w-auto bg-center bg-no-repeat bg-[url('/assets/svg/proBro.svg')]"/>
                        </div>
                        <div data-scroll-section className="z-10 h-screen w-screen text-orange-400">
                            <div className="h-screen w-auto bg-center bg-no-repeat bg-[url('/assets/svg/women.svg')]"/>
                        </div>
                        <div data-scroll-section className="z-10 h-screen w-screen text-orange-400">
                            <div className="h-screen w-auto bg-center bg-no-repeat bg-[url('/assets/svg/raghav.svg')]"/>
                        </div>
                </LocomotiveScrollProvider>
                
            </div>
        </>
    );
};
export default Pronite;