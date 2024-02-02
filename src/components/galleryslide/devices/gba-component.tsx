import { baseImageUrl } from "@/src/utils/url";
import gsap from "gsap";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Modal from "../gallery-modal";
import PreviewComponent from "../previewComponent/preview-component";

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
      className="relative rounded-[85px] flex justify-center items-center w-[85vw] h-[119vw] md:w-[63.5vw] md:h-[30vw] mx-auto"
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
                className="flex justify-center items-center bg-white text-center cursor-pointer"
                onClick={() => setActiveModal(true)}
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
          className={`active:bg-gray-800 md:opacity-40 absolute top-[62.5vw] left-[-8vw] md:-top-[2.2vw] md:-left-[1vw] w-[8vw] h-[6vw] md:h-[9vw] md:w-[9vw] rounded-lg md:rounded-full duration-300 transition-all ease-in-out md:border-none animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 sm:opacity-40 absolute top-[62.5vw] left-[4vw] md:-top-[2.2vw] md:left-[56vw] w-[8vw] h-[6vw] md:h-[9vw] md:w-[9vw] rounded-lg md:rounded-full duration-300 transition-all ease-in-out md:border-none animate-"
        ></button>
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
