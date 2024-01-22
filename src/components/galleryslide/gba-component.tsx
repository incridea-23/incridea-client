import { baseImageUrl } from "@/src/utils/url";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../blurImage";

const GbaComponent = ({ imgArr }: { imgArr: string[] }) => {
  const [active, setActive] = useState<number>(0);
  const [activeImg, setActiveImg] = useState<string>("");
  useEffect(() => {
    setActiveImg(imgArr[active]);
  }, [active, imgArr]);
  const swiperRef = useRef<SwiperType>();
  return (
    <motion.div
      className="relative rounded-[500px] flex justify-center items-center w-[305px] h-[445px] md:w-[65vw] md:h-[33vw] mx-auto md:shadow-none"
      initial={{
        boxShadow: "0px 0px 49px 10px rgba(0,0,0,0.25)",
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
        className="md:hidden object-cover object-center"
        priority
      />
      <Image
        fill
        src={"/assets/svg/gameboy_no_edge.svg"}
        alt="incridea"
        className="hidden md:block"
        priority
      />

      <div className="absolute w-full h-[40%] right-0 md:top-[7.5vw] md:h-[15.55vw] md:w-[34.3vw] md:right-[16.13vw] top-[50px] z-10">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="md:w-[36vw] md:h-[16.7vw] md:top-[0.65vw] md:z-50 w-[230px] h-full border-8 border-[#63aeef] md:border-none relative"
        >
          {imgArr.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white text-center"
              >
                <div className="relative w-full h-full flex justify-center items-center">
                  {/* <BlurImage
                    fill
                    alt="Blurred Image"
                    src={baseImageUrl+img}
                    className="object-cover blur-xl"
                  /> */}
                  <Image
                    fill
                    src={baseImageUrl+img}
                    alt="incridea"
                    className={`object-cover z-10`}
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
          className={`active:bg-gray-800 md:opacity-40 absolute top-[240px] left-[26px] md:-top-[0.9vw] md:-left-[11.1vw] w-[2.2rem] h-8 md:h-[7.3vw] md:w-[7.3vw] rounded-lg md:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 md:border-none animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 sm:opacity-40 absolute top-[240px] left-[80px] md:-top-[0.9vw] md:left-[39.75vw] w-[2.2rem] h-8 md:h-[7.3vw] md:w-[7.3vw] rounded-lg md:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 md:border-none animate-"
        ></button>
      </div>
    </motion.div>
  );
};

export default GbaComponent;
