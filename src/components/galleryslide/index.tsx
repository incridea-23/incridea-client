import Image from "next/image";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { baseImageUrl } from "@/src/utils/url";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import BlurImage from "../blurImage";

type GalleryProps = {
  title: string;
  next: string;
  prev: string;
  imgArr: string[];
};

const GallerySlide: FC<GalleryProps> = ({ title, next, prev, imgArr }) => {
  const [active, setActive] = useState<number>(0);
  const [activeImg, setActiveImg] = useState<string>("");
  const swiperRef = useRef<SwiperType>();
  useEffect(() => {
    setActiveImg(imgArr[active]);
  }, [active, imgArr]);
  return (
    <div className="relative sm:mt-20 rounded-b-3xl flex justify-center items-center w-[305px] h-[445px] sm:w-[65vw] sm:h-[33vw] mx-auto shadow-2xl drop-shadow-2xl sm:shadow-none">
      <Image
        fill
        src={"/assets/svg/gba_no_buttons.svg"}
        alt="incridea"
        className="sm:hidden object-cover object-center"
        priority
      />
      <Image
        fill
        src={"/assets/svg/gba_gameboy.svg"}
        alt="incridea"
        className="hidden sm:block"
        priority
      />

      <div className="absolute w-full h-[40%] right-0 sm:top-[7.45vw] sm:h-[15.55vw] sm:w-[34.3vw] sm:right-[16.13vw] top-[50px] z-10">


        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="sm:w-auto sm:z-50 w-[230px] h-full border-8 border-[#63aeef] sm:border-none relative"
        >
          <SwiperSlide className="flex justify-center items-center bg-white text-center">
            <div className="relative w-full sm:h-60 h-full flex justify-center items-center">
              <Image
                fill
                src={"/assets/png/diver.png"}
                alt="incridea"
                className="object-cover object-center"
                priority
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex justify-center items-center bg-white text-center">
            <div className="relative w-full sm:h-60 h-full flex justify-center items-center">
              <Image
                fill
                src={"/assets/png/diver.png"}
                alt="incridea"
                className="object-cover object-center"
                priority
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex justify-center items-center bg-white text-center">
            <div className="relative w-full sm:h-60 h-full flex justify-center items-center">
              <Image
                fill
                src={"/assets/png/diver.png"}
                alt="incridea"
                className="object-cover object-center"
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center bg-white text-center">
            <div className="relative w-full sm:h-60 h-full flex justify-center items-center">
              <Image
                fill
                src={"/assets/png/diver.png"}
                alt="incridea"
                className="object-cover object-center"
                priority
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`active:bg-gray-800 sm:opacity-40 absolute top-[240px] left-[26px] sm:-top-[1.8vw] sm:-left-[11.15vw] w-[2.2rem] h-8 sm:h-[7.1vw] sm:w-[7.1vw] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 sm:border-none animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 sm:opacity-40 absolute top-[240px] left-[80px] sm:-top-[1.8vw] sm:left-[38.3vw] w-[2.2rem] h-8 sm:h-[7.1vw] sm:w-[7.1vw] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 sm:border-none animate-"
        ></button>
      </div>
    </div>
  );

  // return (
  //   <div
  //     id={title}
  //     className="flex flex-col min-h-screen translate-x-1/2 w-[50%] relative"
  //   >
  //     <div className={`relative mt-32 titleFont`}>
  //       <h1 className="text-6xl text-center">{title}</h1>
  //       <h2 className="text-[150px] outline-text text-center absolute w-full -translate-y-32 opacity-25">
  //         {title}
  //       </h2>
  //     </div>

  //     <div className="absolute top-2/3 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/3 w-[30%] h-[60%] overflow-hidden">
  //       {/* <Image
  //         fill
  //         src={"/assets/png/diver.png"}
  //         alt="incridea"
  //         className="skew-0 sm:-skew-x-12 object-cover object-center"
  //         priority
  //       /> */}
  //     </div>
  //     <div className="flex max-w-5xl sm:max-w-full h-[700px] absolute left-1/2 top-24 -translate-x-1/2 sm:translate-y-6">
  //       <Swiper
  //         mousewheel={true}
  //         autoplay={true}
  //         slidesPerView={1}
  //         onSlideChange={(cur) => setActive(cur.realIndex)}
  //         centeredSlides={true}
  //         speed={1000}
  //         modules={[Mousewheel, Autoplay]}
  //       >
  //         {imgArr?.map((img, index) => (
  //           <SwiperSlide key={index}>
  //             <Image src={"/assets/svg/gba_edited.svg"} alt="svg" width={100} height={100} />
  //             <div
  //               className={`flex h-full w-[100%] items-center justify-center duration-200${
  //                 active === index ? "opacity-100" : "opacity-0"
  //               }`}
  //             >
  //               <div
  //                 className={`flex group hover:cursor-pointer h-[250px] w-[250px] relative overflow-x-hidden scale-[1.5]${
  //                   active === index ? "" : ""
  //                 } transition-all duration-200 ease-in-out`}
  //               >
  //                 <div
  //                   className={`flex h-[250px] w-[250px] absolute duration-200 ${
  //                     active === index
  //                       ? "translate-x-0 opacity-100"
  //                       : "translate-x-4 opacity-0"
  //                   }`}
  //                 >
  //                   <BlurImage
  //                     src={"/assets/png/diver.png"}
  //                     alt="incridea"
  //                     className={`object-cover object-center`}
  //                     fill
  //                     priority
  //                   />
  //                 </div>
  //                 <div
  //                   className={`h-full w-full absolute top-0 left-0 ${
  //                     active === index
  //                       ? "bg-transparent opcaity-100"
  //                       : "opacity-0"
  //                   } transition-all duration-200 ease-in-out justify-center items-center`}
  //                 >
  //                   {/* <h1 className={`${active===index ? 'block' : 'hidden' } text-xl`} >Dance</h1> */}
  //                 </div>
  //               </div>
  //             </div>
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //     </div>
  //     <div className="flex w-full absolute sm:bottom-32 bottom-14 justify-between px-8 lg:px-20 text-4xl sm:text-5xl">
  //       <a
  //         href={`#` + prev}
  //         className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-transform duration-300"
  //       >
  //         <BsChevronUp />
  //       </a>
  //       <a
  //         href={`#` + next}
  //         className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-transform duration-300"
  //       >
  //         <BsChevronDown />
  //       </a>
  //     </div>
  //   </div>
  // );
};

export default GallerySlide;
