import { baseImageUrl } from "@/src/utils/url";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const GbaComponent = ({ imgArr }: { imgArr: string[] }) => {
  const [active, setActive] = useState<number>(0);
  const [activeImg, setActiveImg] = useState<string>("");
  useEffect(() => {
    setActiveImg(imgArr[active]);
  }, [active, imgArr]);
  const swiperRef = useRef<SwiperType>();
  return (
    <motion.div
      className="relative sm:mt-20 rounded-3xl flex justify-center items-center w-[305px] h-[445px] sm:w-[1000px] sm:h-[500px] mx-auto sm:shadow-none"
      initial={{
        boxShadow: "0px 10px 49px 10px rgba(0,0,0,0.25)",
        translateY: -19,
      }}
      animate={{
        boxShadow: "0px 10px 48px 30px rgba(0,0,0,0.25)",
        translateY: 0,
      }}
      exit={{
        translateY: -19,
        boxShadow: "0px 10px 49px 10px rgba(0,0,0,0.25)",
      }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
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
        className="hidden md:block object-cover"
        priority
      />

      <div className="absolute w-full h-[40%] right-0 sm:top-[105px] sm:h-[250px] sm:w-[800px] sm:right-[113px] top-[50px] z-10">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="sm:w-[540px] sm:z-50 w-[230px] h-full border-8 border-[#63aeef] sm:border-none relative"
        >
          {imgArr.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white text-center"
              >
                <div className="relative w-full sm:h-80 h-full flex justify-center items-center">
                  <Image
                    fill
                    src={`${baseImageUrl}` + `/${img}`}
                    alt="incridea"
                    className="object-scale-down object-center"
                    priority
                  />
                </div>
              </SwiperSlide>
            );
          })}

          {/* <SwiperSlide className="flex justify-center items-center bg-white text-center">
            <div className="relative w-full sm:h-80 h-full flex justify-center items-center">
              <Image
                fill
                src={"/assets/png/diver.png"}
                alt="incridea"
                className="object-scale-down object-center"
                priority
              />
            </div>
          </SwiperSlide> */}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`active:bg-gray-800 sm:opacity-40 absolute top-[240px] left-[26px] sm:-top-[21px] sm:-left-[32px] w-[2.2rem] h-8 sm:h-[105px] sm:w-[105px] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out bg-black border-yellow-300 border-2 sm:border-none animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 sm:opacity-40 absolute top-[240px] left-[80px] sm:-top-[21px] bg-black sm:left-[728px] w-[2.2rem] h-8 sm:h-[105px] sm:w-[105px] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 sm:border-none animate-"
        ></button>
      </div>
    </motion.div>
  );
};

export default GbaComponent;
