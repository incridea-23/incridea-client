import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurImage from "../../blurImage";
import Modal from "../gallery-modal";
import PreviewComponent from "../previewComponent/preview-component";

const Console = ({ imgArr }: { imgArr: string[] }) => {
  const [active, setActive] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType>();
  return (
    <div
      id="animation"
      className="relative flex justify-center items-center md:w-[50vw] md:h-[50vw] w-[80vw] h-[65vw] mx-auto md:scale-[135%] scale-[140%]"
    >
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
                className="flex justify-center items-center bg-white text-center"
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
          className={`active:bg-gray-800 bg-black opacity-40 absolute w-[9vw] h-[9vw] top-[12vw] left-[41.5vw] md:top-[18.5vw] md:left-[18.5vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 animate-`}
        ></button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 bg-black opacity-40 absolute w-[9vw] h-[9vw] top-[22vw] left-[41.5vw] md:top-[18.5vw] md:left-[20.5vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full duration-300 transition-all ease-in-out border-yellow-300 border-2 animate-"
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

export default Console;
