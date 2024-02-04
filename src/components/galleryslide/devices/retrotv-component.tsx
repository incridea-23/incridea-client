import retroTV from "@/public/assets/svg/retro-tv.svg";
import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Modal from "../gallery-modal";
import PreviewComponent from "../previewComponent/preview-component";
import styles from "../styles/shadow.module.css";
import ToolTip from "./tool-tip";

const RetroTV = ({ imgArr }: { imgArr: string[] }) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimatingRight, setAnimatingRight] = useState(false);
  const [isAnimatingLeft, setAnimatingLeft] = useState(false);
  const handleButtonClickPrev = () => {
    setAnimatingLeft(true);
    swiperRef.current?.slidePrev();
    setTimeout(() => {
      setAnimatingLeft(false);
    }, 400);
  };
  const handleButtonClickNext = () => {
    setAnimatingRight(true);
    swiperRef.current?.slideNext();
    setTimeout(() => {
      setAnimatingRight(false);
    }, 400);
  };
  const swiperRef = useRef<SwiperType>();
  let thumbnailSrc = "/thumbnails/incridea22.jpg";
  // sm:top-20 lg:top-64 md:top-16 -top-6
  return (
    <div
      id="animation"
      className="relative flex justify-center -top-10 items-center md:w-[40vw] md:h-[60vw] w-[80vw] h-[65vw] mx-auto md:scale-[135%] scale-[140%]"
    >
      {/* <h1
        className={
          styles["text-shadow"] +
          ` text-2xl font-extrabold sm:text-4xl z-50 border-black text-white absolute sm:top-20 lg:top-72 md:top-16 -top-2`
        }
      >
        INCRIDEA <span className="tracking-tight">22</span>
      </h1> */}
      <Image
        fill
        priority
        src={retroTV}
        alt="svg"
        id="image"
        className=""
      ></Image>
      <div className="absolute md:w-[40vw] md:h-[23.6vw] md:right-[10vw] md:top-[21.9vw] w-[40vw] h-[40vw] z-10">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="md:w-[27.8vw] md:h-[21.9vw] md:top-[3.2vw] md:left-[6.3vw] z-50 w-[46vw] h-[36.8vw] top-[11.8vw] -left-[9vw] relative"
        >
          {imgArr.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white text-center cursor-pointer"
                onClick={() => {
                  setActiveModal(true);
                  setActiveIndex(index);
                }}
              >
                <ToolTip
                  classValue="text-center bg-black/60 text-xs border sm:text-lg"
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
          <SwiperSlide
            className="flex justify-center items-center bg-white text-center cursor-pointer"
            onClick={() => {
              setActiveIndex(imgArr.length);
              setActiveModal(true);
            }}
          >
            {/* <ToolTip
              classValue="top-[0] text-center bg-black/60 sm:right-[12vw] right-0 text-xs border sm:text-lg"
              text="click to watch aftermovie"
            ></ToolTip> */}
            <div className="relative w-full h-full flex justify-center items-center">
              <BlurImage
                fill
                alt="Blurred Image"
                src={thumbnailSrc}
                className="object-cover blur-xl"
              />
              <Image
                fill
                src={thumbnailSrc}
                alt="incridea"
                className={`object-cover z-10`}
                priority
              />
            </div>
            <button
              onClick={() => {
                setActiveIndex(imgArr.length);
                setActiveModal(true);
              }}
              className={
                styles["text-shadow"] +
                ` text-base p-2 md:text-lg md:font-extrabold bg-transparent text-white absolute z-50 top-0 left-0 text-center w-full`
              }
            >
              Click to Watch After Movie
            </button>
          </SwiperSlide>
        </Swiper>

        <button
          onClick={() => handleButtonClickPrev()}
          className={`absolute w-[9vw] h-[9vw] top-[12vw] left-[41.5vw] md:top-[3.4vw] md:left-[43vw] md:w-[5vw] md:h-[5vw] rounded-full duration-300 transition-all ease-in-out border-white ${
            isAnimatingLeft ? "sm:border-8 border-2 animate-ping" : ""
          }`}
        >
          <ToolTip
            classValue="text-xs border top-0 px-0 bg-black/50"
            text="prev image"
          ></ToolTip>
        </button>
        <button
          onClick={() => handleButtonClickNext()}
          className={`absolute w-[9vw] h-[9vw] top-[22vw] left-[41.5vw] md:top-[9.5vw] md:left-[43vw] md:w-[5vw] md:h-[5vw] rounded-full duration-300 transition-all ease-in-out border-white ${
            isAnimatingRight
              ? "sm:border-8 border-2 animate-ping"
              : ""
          }`}
        >
          <ToolTip
            classValue="text-xs border bg-black/50"
            text="next image"
          ></ToolTip>
        </button>
      </div>
      <Modal
        showModal={activeModal}
        title="test"
        onClose={() => setActiveModal(false)}
      >
        <PreviewComponent
          imgArr={imgArr}
          afterMovieLink="JHgT5PzLc4Q"
          index={activeIndex}
          thumbnailSrc={thumbnailSrc}
        />
      </Modal>
    </div>
  );
};

export default RetroTV;
