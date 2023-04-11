import { NextPage } from "next";
import { motion } from "framer-motion";
import { useRef } from "react";
import GallerySlide from '@/src/components/galleryslide';
import { FooterBody } from "@/src/components/footer";
import { titleFont } from "@/src/utils/fonts";

const img2019:string[] = [
    '2019/IMG_4594.1b2540e728239d8e2328.jpeg',
    '2019/IMG_4605.0ced10c04814cf57ee58.jpeg',
    '2019/IMG_4919.c4f672de113a45bec347.jpeg',
    '2019/IMG_4966.6bcc092f0b08d0adb9a4.jpeg',
    '2019/IMG_5018.90b53a45cf5842218d73.jpeg',
    '2019/IMG_5234.372a0e24bfcd2d2dcf75.jpeg',
    '2019/IMG_5252.7b299f35a6453cd013dd.jpg',
    '2019/IMG_5416.49ef052d8a777051069e.jpeg',
    '2019/IMG_5612.6a2563a91f11336777be.jpeg',
    '2019/IMG_5617.7ee3ea581fed4a6be271.jpg',
    '2019/IMG_5630.205d8ace86b36ed1d4c4.jpg',
    '2019/IMG_5752.c298fbafbfe1da0b383e.jpg',
    '2019/IMG_5753.ed88b045eb9ff89cf8fd.jpeg',
]

const img2020:string[] = [
    '2020/DJI_0025.d179be3ab14d43f55544.jpeg',
    '2020/DSC02832.53ca3ed377c84ab53387.jpg',
    '2020/DSC03673.e066f63e8007c6b27224.jpg',
    '2020/DSC03853.8178e8851dd1b5740e83.jpg',
    '2020/DSC03908.7a6b934d1020efaa9da1.jpg',
    '2020/DSC04010.a3a0a26bfcd8ed3061df.jpg',
    '2020/DSC04067.f4bb10d035aaca518cfe.jpg',
    '2020/DSC04111.29fbf6e00b4e8bf58e9a.jpg',
    '2020/DSC04780.3119d3c66d91466de030.jpg',
    '2020/IMG_0127.3a634cd54fe3b5e2fb97.jpg',
    '2020/IMG_2909.2b9da1297f2d7066de2a.jpeg',
    '2020/IMG_2918.39915abbc79394c909d1.jpeg',
    '2020/IMG_2973.4b86f6d224d515116735.jpeg',
    '2020/IMG_3263.378ce6375fd5756e0cbd.jpeg',
]

const img2022:string[] = [
    '2022/_DSC3608.jpg',
    '2022/CHRISTY_DAY2.JPG',
    '2022/DSC_0017.JPG',
    '2022/DSC_0249.JPG',
    '2022/DSC_0261.JPG',
    '2022/DSC00245.jpg',
    '2022/DSC00757.JPG',
    '2022/DSC00762.JPG',
    '2022/DSC00835.JPG',
    '2022/DSC08217.jpg',
    '2022/DSC08772.jpg',
    '2022/DSC09237.jpg',
    '2022/DSC09293.jpg',
    '2022/DSC09493.jpg',
    '2022/DSC09832.jpg',
    '2022/DSC09860.JPG',
    '2022/IMG_0017.jpg',
    '2022/IMG_0316.jpg',
    '2022/IMG_1303.jpg',
    '2022/IMG_5551.jpg',
    '2022/IMG_8506.JPG',
    '2022/IMG_8537.JPG',
    '2022/IMG_8903.jpg',
    '2022/IMG_9542.jpg',
    '2022/IMG_9611.jpg',
    '2022/SHS03213.jpg'
]

const Gallery:NextPage = () => {

    const containerRef = useRef(null);

    return (
        <div className="flex flex-col h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100 bg-gradient-to-b from-[#2d6aa6] to-[#052749] snap-y snap-mandatory relative">
            {/* Header Part */}
            <div id="head"  className="snap-start min-h-screen w-full relative flex overflow-hidden bg-black/60">
                <video autoPlay loop muted className="object-cover object-center w-full h-full opacity-50 scale-[1.1]">
                    <source src="gallery.mp4" type="video/mp4"></source>
                </video>
                <motion.div
                animate={{y:[20,0],opacity:[0,1],repeatCount:1}}
                transition={{duration:3 }}
                className={`${titleFont.className} absolute top-1/2 flex w-full justify-center flex-col`}>
                    <h1 className="text-4xl sm:text-6xl text-center">The Wall of Incridea</h1>
                    <h2 className="text-2xl sm:text-4xl text-center">Incridea Over the Years</h2>
                </motion.div>
                <motion.div
                animate={{y:[30,0],opacity:[0,1],repeatCount:1}}
                transition={{ duration:3 }}
                style={{x:"-50%"}}
                className="h-1 w-40 hidden sm:flex bg-gray-100 absolute bottom-8 left-1/2"></motion.div>
            </div>
            
            <GallerySlide title={'2022'} next={'2020'} prev={'head'} imgArr={img2022} />
            <GallerySlide title={'2020'} next={'2019'} prev={'2022'} imgArr={img2020}  />
            <GallerySlide title={'2019'} next={'footer'} prev={'2020'} imgArr={img2019}  />
            
            <FooterBody/>
        </div>
    )
}

export default Gallery;
