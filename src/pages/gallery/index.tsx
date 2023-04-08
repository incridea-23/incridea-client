import { NextPage } from "next";
import { motion } from "framer-motion";
import { useRef } from "react";
import GallerySlide from '@/src/components/galleryslide';

const Gallery:NextPage = () => {

    const containerRef = useRef(null);

    return (
        <div className="flex flex-col h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100 bg-gradient-to-b from-[#2d6aa6] to-[#052749] snap-y snap-mandatory snap-start relative">
            {/* Header Part */}
            <div id="head"  className="snap-start min-h-screen w-full relative flex overflow-hidden bg-black/60">
                <video autoPlay loop muted className="object-cover object-center w-full h-full opacity-50 scale-[1.1]">
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
                <GallerySlide title={'2022'} next={'2020'} prev={'head'} />
                <GallerySlide title={'2020'} next={'2019'} prev={'2022'} />
                <GallerySlide title={'2019'} next={''} prev={'2020'} />
        </div>
    )
}

export default Gallery;
