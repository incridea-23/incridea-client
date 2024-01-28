import retroPCSVG from "@/public/assets/svg/retro-pc.svg";
import { baseImageUrl } from "@/src/utils/url";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../blurImage";

const RetroPC = ({ imgArr }: { imgArr: string[] }) => {
  const swiperRef = useRef<SwiperType>();

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const t1 = gsap.timeline();
  //     t1.from("#animation", {
  //       delay: 0.2,
  //       filter: "drop-shadow:(0px 10px 40px rgba(0,0,0,0.45))",
  //       y: -90,
  //       // boxShadow: "0px 10px 67px 40px rgba(0,0,0,0.25)",
  //     }).to("#animation", {
  //       y: 0,
  //       filter: "drop-shadow(0px 10px 95px rgba(0,0,0,0.55))",
  //       // boxShadow: "0px 10px 67px 90px rgba(0,0,0,0.25)",
  //       duration: 1,
  //     });
  //   });
  // }, [activeYear]);

  return (
    <div
      id="animation"
      className="relative rounded-[85px] flex justify-center items-center w-[40svw] h-[60svw] mx-auto md:scale-[120%] scale-[260%]"
    >
      <Image fill priority src={retroPCSVG} alt="svg" id="image"></Image>
      <div className="absolute w-[50svw] h-[23.6svw] right-[5svw] top-[19svw] z-10">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="w-[32.2svw] h-[25.3svw] -top-[7.3svw] left-[10svw] z-50 relative"
        >
          {imgArr.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white text-center"
              >
                <div className="relative w-full h-full flex justify-center items-center">
                  <BlurImage
                    fill
                    alt="Blurred Image"
                    src={baseImageUrl + img}
                    className="object-cover blur-xl"
                  />
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
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`active:bg-gray-800 bg-black opacity-40 absolute top-[19.2svw] left-[svw] w-[4.2svw] h-[1.3svw] rounded-lg duration-300 transition-all ease-in-out border-yellow-300 border-2 animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 bg-black opacity-40 absolute top-[19.2svw] left-[40.7svw] w-[4.2svw] h-[1.3svw] rounded-lg duration-300 transition-all ease-in-out border-yellow-300 border-2 animate-"
        ></button>
      </div>
    </div>
  );
};

export default RetroPC;
