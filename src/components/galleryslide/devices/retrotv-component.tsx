import retroTV from "@/public/assets/svg/retro-tv.svg";
import { baseImageUrl } from "@/src/utils/url";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Modal from "../preview/gallery-modal";
import PreviewComponent from "../preview/preview-component";

const RetroTV = ({ imgArr }: { imgArr: string[] }) => {
  const swiperRef = useRef<SwiperType>();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  return (
    <div
      id="animation"
      className="relative flex justify-center items-center md:w-[40vw] md:h-[60vw] w-[80vw] h-[65vw] mx-auto md:scale-[120%] scale-[140%]"
    >
      <Image
        fill
        priority
        src={retroTV}
        alt="svg"
        id="image"
        className="-translate-y-12"
      ></Image>
      <div className="absolute md:w-[40vw] md:h-[23.6vw] md:right-[10vw] md:top-[21.9vw] w-[40vw] h-[40vw] z-10">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          mousewheel={true}
          modules={[Navigation, Autoplay, Mousewheel]}
          autoplay={true}
          className="md:w-[27.8vw] md:h-[21.9vw] md:top-[3.2vw] md:left-[6.3vw] z-50 w-[46vw] h-[36.8vw] top-[11.8vw] -left-[9vw] relative -translate-y-12"
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
          className={`active:bg-gray-800 bg-black opacity-40 -translate-y-12 absolute w-[9vw] h-[9vw] top-[12vw] left-[41.5vw] md:top-[3.4vw] md:left-[43vw] md:w-[5vw] md:h-[5vw] rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 bg-black opacity-40 -translate-y-12 absolute w-[9vw] h-[9vw] top-[22vw] left-[41.5vw] md:top-[9.5vw] md:left-[43vw] md:w-[5vw] md:h-[5vw] rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 animate-"
        ></button>
      </div>
      <Modal
        showModal={activeModal}
        title="preview"
        onClose={() => setActiveModal(false)}
      >
        <PreviewComponent imgArr={imgArr} />
      </Modal>
    </div>
  );
};

export default RetroTV;
