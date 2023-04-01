import { NextPage } from "next";
import { motion } from "framer-motion";
import { useRef } from "react";

import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import 'locomotive-scroll/dist/locomotive-scroll.css';

import GallerySlide from "@/src/components/galleryslide";

const Gallery:NextPage = () => {

    const containerRef = useRef(null);

    return (
        <div data-scroll-container className="min-h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100 bg-gradient-to-br from-[#044b8b]  to-[#020024]" ref={containerRef}>
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
              containerRef={containerRef}
            >
            {/* Header Part */}
            <div data-scroll-section className="h-screen w-full relative flex bg-black overflow-hidden">
                <video data-scroll data-scroll-speed="-3" autoPlay loop muted className="object-cover object-center w-full h-full grayscale opacity-50">
                    <source src="gallery.mp4" type="video/mp4"></source>
                </video>
                <motion.div
                animate={{y:[20,0],opacity:[0,1],repeatCount:1}}
                transition={{duration:3 }}
                className="absolute top-1/2 flex w-full justify-center flex-col">
                    <h1 className="text-4xl sm:text-6xl text-center">The Wall of Incridea</h1>
                    <h2 className="text-2xl sm:text-4xl text-center">Incridea Over the Years</h2>
                </motion.div>
                <motion.div
                animate={{y:[30,0],opacity:[0,1],repeatCount:1}}
                transition={{ duration:3 }}
                style={{x:"-50%"}}
                className="h-1 w-40 flex bg-gray-100 absolute bottom-8 left-1/2"></motion.div>
            </div>
            <div data-scroll-section className="mt-20">
                <GallerySlide title={'2022'} />
                <GallerySlide title={'2020'} />
                <GallerySlide title={'2019'} />
            </div>
            </LocomotiveScrollProvider>
        </div>
    )
}

export default Gallery;