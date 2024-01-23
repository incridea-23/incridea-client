import { baseImageUrl } from "@/src/utils/url";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../blurImage";

const GbaComponent = ({ imgArr, year }: { imgArr: string[]; year: number }) => {
  const [active, setActive] = useState<number>(0);
  const [activeImg, setActiveImg] = useState<string>("");
  useEffect(() => {
    setActiveImg(imgArr[active]);
  }, [active, imgArr]);

  const swiperRef = useRef<SwiperType>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#animation", {
        x: -60,
      })
        .to("#animation", {
          x: 0,
          duration: 0.5,
        })
        .from("#animation", {
          y: -90,
          boxShadow: "0px 10px 67px 40px rgba(0,0,0,0.25)",
        })
        .to("#animation", {
          y: 0,
          boxShadow: "0px 10px 67px 90px rgba(0,0,0,0.25)",
          duration: 1,
        });
    });

    return () => ctx.revert();
  }, [year]);

  return (
    <div
      id="animation"
      className="relative rounded-[85px] flex justify-center items-center w-[85vw] h-[119vw] md:w-[63.5vw] md:h-[30vw] mx-auto"
      // initial={{
      //   boxShadow: "0px 0px 49px 10px rgba(0,0,0,0.25)",
      //   translateY: -19,
      // }}
      // animate={{
      //   boxShadow: "0px 10px 48px 30px rgba(0,0,0,0.25)",
      //   translateY: 0,
      // }}
      // exit={{
      //   translateY: -19,
      //   boxShadow: "0px 10px 49px 10px rgba(0,0,0,0.25)",
      // }}
      // transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      <Image
        fill
        src={"/assets/svg/gba-vertical.svg"}
        alt="incridea"
        className="md:hidden object-center scale-110"
        priority
      />
      <Image
        fill
        src={"/assets/svg/gba-horizontal.svg"}
        alt="incridea"
        className="hidden md:block scale-125"
        priority
      />

      <div className="absolute w-[50vw] h-[23.6vw] md:top-[5.5vw] md:h-[31vw] md:w-[64vw] md:right-[-.35vw] top-[19vw] z-10 scale-[110%]">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="md:w-[35.7vw] md:h-[18vw] md:-top-[.9vw] w-[58vw] h-[54vw] md:left-[0] -top-[7vw] left-[-4vw] md:z-50 md:border-none relative md:scale-125"
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
                    src={baseImageUrl + img}
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
          className={`active:bg-gray-800 bg-black md:opacity-40 absolute top-[62.5vw] left-[-8vw] md:-top-[2.2vw] md:-left-[1vw] w-[8vw] h-[6vw] md:h-[9vw] md:w-[9vw] rounded-lg md:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 md:border-none animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 bg-black sm:opacity-40 absolute top-[62.5vw] left-[4vw] md:-top-[2.2vw] md:left-[56vw] w-[8vw] h-[6vw] md:h-[9vw] md:w-[9vw] rounded-lg md:rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 md:border-none animate-"
        ></button>
      </div>
    </div>
  );
};

export default GbaComponent;
