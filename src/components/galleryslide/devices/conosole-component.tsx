import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Modal from "../gallery-modal";
import PreviewComponent from "../previewComponent/preview-component";
import styles from "../styles/shadow.module.css";
import ToolTip from "./tool-tip";

const Console = ({ imgArr }: { imgArr: string[] }) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType>();
  return (
    <div
      id="animation"
      className="relative flex justify-center items-center md:w-[50vw] md:h-[50vw] w-[80vw] h-[65vw] mx-auto md:scale-[105%] scale-[140%] sm:top-20"
    >
      <h1
        className={
          styles["text-shadow"] +
          ` text-2xl font-extrabold sm:text-5xl z-50 border-black text-white absolute sm:top-[5.5rem] -top-4`
        }
      >
        INCRIDEA <span className="tracking-tight">23</span>
      </h1>
      <Image
        fill
        priority
        src={"/assets/svg/controller-tv.svg"}
        alt="svg"
        id="image"
        className=""
      ></Image>
      <div className="absolute md:w-[40vw] md:h-[23.6vw] md:right-[10vw] md:top-[19vw] w-[40vw] h-[40vw] z-10">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="md:w-[38.3vw] md:h-[19.3vw] md:top-[-9.1vw] md:left-[5.3vw] z-50 w-[61vw] h-[30.8vw] top-[-4.1vw] -left-[10.1vw] relative"
        >
          {imgArr.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white text-center cursor-pointer"
                onClick={() => setActiveModal(true)}
              >
                <ToolTip
                  classValue="top-[0] text-center sm:right-[14vw] right-0 text-xs border sm:text-lg"
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
          className={`active:bg-gray-800 opacity-40 absolute w-[9vw] h-[9vw] top-[12vw] left-[41.5vw] md:top-[18.5vw] md:left-[18.5vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full duration-300 transition-all ease-in-out animate-`}
        >
          <ToolTip
            classValue="top-[-1vw] sm:right-[3vw] text-xs right-0 border sm:text-base"
            text="prev image"
          ></ToolTip>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 opacity-40 absolute w-[9vw] h-[9vw] top-[22vw] left-[41.5vw] md:top-[18.5vw] md:left-[20.5vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full duration-300 transition-all ease-in-out animate-"
        >
          <ToolTip
            classValue="top-[-6vw] sm:right-[-1.5vw] text-xs right-0 border sm:text-base"
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

export default Console;
