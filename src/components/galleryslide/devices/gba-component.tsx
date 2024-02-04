import { baseImageUrl } from "@/src/utils/url";
import gsap from "gsap";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import { BiPlay } from "react-icons/bi";
import YouTube, { YouTubeProps } from "react-youtube";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Button from "../../button";
import Modal from "../gallery-modal";
import PreviewComponent from "../previewComponent/preview-component";
import styles from "../styles/shadow.module.css";
import ToolTip from "./tool-tip";

const GbaComponent = ({ imgArr }: { imgArr: string[] }) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  let thumbnailSrc = "/thumbnails/incridea19.jpg";
  
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

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      fs: 1,
    },
  };

  const youtubePlayerRef = useRef<YouTube | null>(null);

  const handlePlay = (event: any) => {
    event.target.pauseVideo();
    setActiveIndex(imgArr.length);
    setActiveModal(true);
  };

  return (
    <div className="relative flex flex-col gap-y-0">
      {" "}
      {/* <h1
      id="animation"
        className={
          styles["text-shadow"] +
          ` font-extrabold sm:text-6xl text-4xl z-50 border-black text-white`
        }
      >
        INCRIDEA <span className="tracking-tight">19</span>
      </h1> */}
      <div
        id="animation"
        className="relative rounded-[85px] flex justify-center items-center w-[85vw] h-[119vw] sm:w-[63.5vw] sm:h-[30vw] mx-auto sm:top-16"
      >
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
                  onClick={() => {
                    setActiveModal(true);
                    setActiveIndex(index);
                  }}
                >
                  <ToolTip
                    classValue="top-[0] text-center bg-black/60 sm:right-[12vw] right-0 text-xs border sm:text-lg"
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
                  className="object-fill blur-xl"
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
                  ` text-base p-2 h-full md:text-lg md:font-extrabold bg-transparent text-white absolute z-50 top-0 left-0 text-center w-full`
                }
              >
                Click to Watch After Movie
              </button>
            </SwiperSlide>
          </Swiper>

          <button
            onClick={handleButtonClickPrev}
            className={`absolute top-[67vw] left-[-9.6vw] sm:-top-[2.2vw] sm:-left-[1.4vw] w-[8vw] h-[6vw] sm:h-[9vw] sm:w-[9vw] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out border-gray-100 ${
              isAnimatingLeft ? " sm:border-8 border-2 animate-ping" : ""
            }`}
          >
            <ToolTip
              classValue="top-[5vw] sm:left-20 right-0 text-xs border sm:text-lg bg-black/60"
              text="prev image"
            ></ToolTip>
          </button>
          <button
            onClick={handleButtonClickNext}
            className={`absolute top-[67vw] left-[2vw] sm:-top-[2.2vw] sm:left-[56vw] w-[8vw] h-[6vw] sm:h-[9vw] sm:w-[9vw] rounded-lg sm:rounded-full duration-300 transition-all ease-in-out border-gray-100 ${
              isAnimatingRight ? " sm:border-8 border-2 animate-ping" : ""
            }`}
          >
            <ToolTip
              classValue="top-[5vw] sm:right-[1vw] right-[-10vw] bg-black/60 text-xs border sm:text-lg"
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
            index={activeIndex}
            afterMovieLink="gmF72fu1w6A"
            thumbnailSrc={thumbnailSrc}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GbaComponent;
