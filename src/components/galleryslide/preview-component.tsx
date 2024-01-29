import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Autoplay,
  FreeMode,
  Mousewheel,
  Navigation,
  Swiper as SwiperType,
  Thumbs,
} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

const PreviewComponent = ({ imgArr }: { imgArr: string[] }) => {
  const isMediumScreen = useMediaQuery({ query: "(min-width: 800px)" });
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-20 gap-6 border-black">
    //   {/* <div key={imgArr[0]}>
    //     <Image
    //       width={400}
    //       height={400}
    //       src={baseImageUrl + imgArr[0]}
    //       alt="incridea"
    //       className={`object-cover z-10`}
    //       priority
    //     />
    //   </div>
    //   <div key={imgArr[1]}>
    //     <Image
    //       width={400}
    //       height={400}
    //       src={baseImageUrl + imgArr[1]}
    //       alt="incridea"
    //       className={`object-cover z-10`}
    //       priority
    //     />
    //   </div> */}
    //   {imgArr.map((img) => (
    //     <div key={img} className="col-span-1 row-span-1">
    //       <Image
    //         width={500}
    //         height={250}
    //         src={baseImageUrl + img}
    //         alt="incridea"
    //         className={`object-cover z-10 w-full h-full`}
    //         priority
    //       />
    //     </div>
    //   ))}
    // </div>
    <>
      <Swiper
        style={{
          //@ts-ignore
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        mousewheel={true}
        modules={[Navigation, Autoplay, Mousewheel, FreeMode, Thumbs]}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          //@ts-ignore
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        autoplay={true}
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
      </Swiper>
    </>
  );
};

export default PreviewComponent;
