import { baseImageUrl } from "@/src/utils/url";
import gsap from "gsap";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Modal from "../gallery-modal";
import PreviewComponent from "../previewComponent/preview-component";
import ToolTip from "./tool-tip";

const GbaComponent = ({ imgArr }: { imgArr: string[] }) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const swiperRef = useRef<SwiperType>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#animation", {
        y: -90,
        filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.45))",
      }).to("#animation", {
        y: 0,
        filter: "drop-shadow(0px 0px 2vw white)",
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="animation"
      className="font-VikingHell relative rounded-[85px] flex justify-center items-center w-[85vw] h-[119vw] sm:w-[63.5vw] sm:h-[30vw] mx-auto top-10"
    >
      <h1 className="font-bold text-4xl sm:text-6xl tracking-widest z-50 text-white absolute sm:-top-32 -top-20">
        Incridea{" "}
        <span className="font-mono tracking-tight font-extrabold">19</span>
      </h1>
      <Image
        fill
        src={"/assets/svg/gba-vertical.svg"}
        alt="incridea"
        className="sm:hidden object-center scale-110"
        priority
      />
      <Image
        fill
        src={"/assets/svg/gba-horizontal.svg"}
        alt="incridea"
        className="hidden sm:block scale-[120%]"
        priority
      />

      <div className="absolute w-[50vw] h-[23.6vw] sm:top-[5.5vw] sm:h-[31vw] sm:w-[64vw] sm:right-[-.35vw] top-[19vw] z-10 scale-[105%]">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="sm:w-[35.7vw] sm:h-[18vw] sm:-top-[.9vw] w-[58vw] h-[54vw] sm:left-[0] -top-[7vw] left-[-4vw] sm:z-50 sm:border-none relative sm:scale-125"
        >

          {imgArr.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white text-center cursor-pointer"
                onClick={() => setActiveModal(true)}
              >
                <ToolTip
                  classValue="top-[0] text-center sm:right-[12vw] right-0 text-xs border sm:text-lg"
                  text="click to preview image"
                ></ToolTip>
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
          className={`active:bg-gray-800 sm:opacity-40 absolute top-[62.5vw] left-[-8vw] sm:-top-[2.2vw] sm:-left-[1vw] w-[8vw] h-[6vw] sm:h-[9vw] sm:w-[9vw] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out sm:border-none animate-`}
        >
          <ToolTip
            classValue="top-[5vw] sm:right-[2vw] right-0 text-xs border sm:text-lg"
            text="prev image"
          ></ToolTip>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 sm:opacity-40 absolute top-[62.5vw] left-[4vw] sm:-top-[2.2vw] sm:left-[56vw] w-[8vw] h-[6vw] sm:h-[9vw] sm:w-[9vw] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out sm:border-none animate-"
        >
          <ToolTip
            classValue="top-[5vw] sm:right-[1vw] right-[-10vw] text-xs border sm:text-lg"
            text="next image"
          ></ToolTip>
        </button>
      </div>

      <Modal
        showModal={activeModal}
        title="test"
        onClose={() => setActiveModal(false)}
      >
        <PreviewComponent imgArr={imgArr} />
      </Modal>
    </div>
  );
};

export default GbaComponent;
