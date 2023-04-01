import { FC, useState,useEffect } from "react";
import Image from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay,Navigation } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";


type GalleryProps = {
    title : string
}

const GallerySlide:FC<GalleryProps> = ({title}) => {


    const [active,setActive] = useState<number>(0);
    const [activeImg,setActiveImg] = useState<string>('');
    const imgSrc:string = 'https://res.cloudinary.com/nexttrek/image/upload/v1679811681/Incridea/'
    const imgArr:string[] = ['Incridea4_fonbcr.jpg','Incridea2_siq5io.jpg','Incridea3_wtpqd6.jpg','Incridea1_a9wmv1.jpg','Incridea3_wtpqd6.jpg','Incridea1_a9wmv1.jpg']
    
    useEffect(()=>{
        setActiveImg(imgArr[active])
    },[active,imgArr])

    


    return(
        <div data-scroll data-scroll-speed="3" className="flex flex-col h-screen w-full relative">

            <div className="relative">
                <h1 className="text-6xl text-center">{title}</h1>
                <h2 className="text-7xl text-center absolute w-full -translate-y-16 opacity-25">{title}</h2>
            </div>
            

            <div className="absolute top-1/2 left-1/2 opacity-40 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-black skew-x-0 sm:skew-x-12 overflow-hidden">
                <Image fill src={imgSrc+activeImg} alt="incridea" className="skew-0 sm:-skew-x-12 scale-110 object-cover object-center" />
            </div>
            <div className='flex max-w-5xl sm:max-w-full h-[700px] self-center absolute left-1/2 -translate-x-1/2 sm:translate-y-6'>
                    <Swiper
                    navigation={true}
                    slidesPerView={3}
                    onSlideChange={(cur) => setActive(cur.realIndex)}
                    loop={true}
                    centeredSlides={true}
                    speed={800}
                    autoplay={{delay:3000}}
                    modules={[Autoplay,Navigation]}
                    >
                        {imgArr?.map((img,index)=>(
                            <SwiperSlide key={index} >
                                <div className={`flex h-full w-full items-center justify-center ${active===index ? 'z-30':'z-0'}`}>
                                    <div className={`flex group hover:cursor-pointer h-[175px] min-w-[250px] relative overflow-hidden ${active === index ? 'scale-[1.5] lg:scale-[2.2] -rotate-90' : 'scale-75 rotate-0'} transition-all duration-500 ease-in-out`}>
                                        <div className={`flex h-[250px] w-[250px] absolute ${active===index? 'rotate-90':'rotate-0'}`}>
                                            <Image src={imgSrc+img} alt="incridea" fill className={`object-cover object-center`} />
                                        </div>
                                        <div className={`h-full w-full absolute top-0 left-0 ${active===index ? 'bg-transparent' : 'bg-black/50' } transition-all duration-500 ease-in-out justify-center items-center`} >
                                            <h1 className={`${active===index ? 'block' : 'hidden' } text-xl`} >Dance</h1>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>   
            </div>   
        </div>
    )
}

export default GallerySlide;