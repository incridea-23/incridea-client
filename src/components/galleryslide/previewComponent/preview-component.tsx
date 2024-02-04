import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Autoplay, FreeMode, Mousewheel, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

const PreviewComponent = ({
  imgArr,
  index,
  afterMovieLink,
  thumbnailSrc,
}: {
  imgArr: string[];
  index: number;
  afterMovieLink: string;
  thumbnailSrc: string;
}) => {
  const isMediumScreen = useMediaQuery({ query: "(min-width: 800px)" });
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          //@ts-ignore
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        initialSlide={index}
        mousewheel={true}
        modules={[Navigation, Autoplay, Mousewheel, FreeMode, Thumbs]}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          //@ts-ignore
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="md:w-[80%] md:h-[80vh] h-[30vh] w-[90%] md:z-50 md:border-none md:mt-[2vh]"
      >
        {imgArr.map((img, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center bg-white text-center"
            >
              <div className="w-full h-full flex justify-center items-center">
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
        <SwiperSlide
          key={imgArr.length}
          className="flex justify-center w-full h-full items-center bg-white text-center cursor-pointer z-50"
        >
          <div className="relative w-full h-full flex justify-center items-center z-50">
            <iframe
              className="w-full h-full"
              title="Youtube player"
              allowFullScreen={true}
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={`https://www.youtube.com/embed/${afterMovieLink}?autoplay=1&playsinline=1&rel=0&fs=1&controls=1&mute=1`}
            ></iframe>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        mousewheel={true}
        //@ts-ignore
        onSwiper={setThumbsSwiper}
        slidesPerView={!isMediumScreen ? 5 : 10}
        speed={500}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        autoplay={true}
        className="w-full h-[12vh] md:z-50 absolute md:mb-[2vh]"
      >
        {imgArr.map((img, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center bg-black text-center opacity-50 scale-90 transition-all duration-500"
            >
              <div className="h-full flex justify-center items-center">
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
        <SwiperSlide
          key={index}
          className="flex justify-center items-center bg-black text-center opacity-50 scale-90 transition-all duration-500"
        >
          <div className="h-full flex justify-center items-center">
            {/* <BlurImage
                    fill
                    alt="Blurred Image"
                    src={baseImageUrl+img}
                    className="object-cover blur-xl"
                  /> */}
            <Image
              fill
              src={thumbnailSrc}
              alt="incridea"
              className={`object-cover z-10`}
              priority
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default PreviewComponent;
