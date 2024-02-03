import retroPCSVG from "@/public/assets/svg/retro-pc.svg";
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

interface RippleState {
  x: number;
  y: number;
  active: boolean;
}

const RetroPC = ({ imgArr }: { imgArr: string[] }) => {
  const [ripple, setRipple] = useState<RippleState>({
    x: 0,
    y: 0,
    active: false,
  });
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType>();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipple({ x, y, active: true });

    setTimeout(() => setRipple({ x: 0, y: 0, active: false }), 800);
  };

  return (
    <div
      id="animation"
      className="relative rounded-[85px] flex justify-center items-center w-[40svw] h-[60svw] mx-auto md:scale-[105%] scale-[200%] top-0 sm:top-20"
    >
      <h1
        className={
          styles["text-shadow"] +
          ` text-lg font-extrabold sm:text-5xl z-50 border-black text-white absolute sm:top-32 top-2`
        }
      >
        INCRIDEA <span className="tracking-tight">20</span>
      </h1>
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
                className="flex justify-center items-center bg-white text-center cursor-pointer"
                onClick={() => setActiveModal(true)}
              >
                <ToolTip
                  classValue="top-[0] text-center sm:right-[10vw] right-0 text-xs border sm:text-lg"
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
          className={`active:bg-gray-800 opacity-40 absolute top-[19.2svw] left-[svw] w-[4.2svw] h-[1.3svw] rounded-lg duration-300 transition-all ease-in-out animate-`}
        >
          <ToolTip
            classValue="top-[2vw] bg-black sm:right-[0vw] text-xs border sm:text-base"
            text="prev image"
          ></ToolTip>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="active:bg-gray-800 opacity-40 absolute top-[19.2svw] left-[40.7svw] w-[4.2svw] h-[1.3svw] rounded-lg duration-300 transition-all ease-in-out animate-"
        >
          <ToolTip
            classValue="top-[2vw] bg-black sm:right-[0vw] text-xs right-0 border sm:text-base"
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

export default RetroPC;
