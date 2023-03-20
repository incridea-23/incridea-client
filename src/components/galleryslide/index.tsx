import { FC } from "react";
import Image from "next/image";
import {motion} from 'framer-motion';
import Noise from "./Noise";

type GalleryProps = {
    title : string,
    imageArr : string[]
}

const GallerySlide:FC<GalleryProps> = ({title,imageArr}) => {
    return(
        <div className="mt-12 p-5">
            {/* Heading */}
            <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration:2 }}
            className="flex w-full relative">
                <h2 className="w-full text-center text-6xl">{title}</h2>
                <h1 className="absolute w-full text-center text-7xl opacity-20">{title}</h1>
            </motion.div>

            {/* Slider */}
            <div className="flex overflow-auto w-full mt-10 scroll-hide">
                {imageArr?.map((el,i)=>(
                    <Noise key={i} imgSrc={el}/>
                ))}
            </div>

        </div>
    )
}

export default GallerySlide;