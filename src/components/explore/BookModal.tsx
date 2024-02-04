import Sponsors from "@/src/pages/sponsors";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import HTMLFlipBook from "react-pageflip";
import useStore from "../store/store";
import styles from "./bookModal.module.css";
interface BookModalType {
  isMuted: boolean;
  mainThemeAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const BookModal: React.FC<BookModalType> = ({ isMuted, mainThemeAudioRef }) => {
  const sponsors = [
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios",
      title: "Sponsor Sponsor Sponsor",
    },
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios 2",
      title: "Sponsor Sponsor Sponsor",
    },
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios 3",
      title: "Sponsor Sponsor Sponsor",
    },
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios 4",
      title: "Sponsor Sponsor Sponsor",
    },
  ];

  const setSponsorFlag = useStore((state) => state.setSponsor);
  const sponsorFlag = useStore((state) => state.sponsor);

  useEffect(() => {
    const audio = new Audio("/audio/level2/pirates.mp3");
    audio.volume = 0.3;
    let mainRef = mainThemeAudioRef;
    if (isMuted) {
      return;
    } else if (!isMuted && sponsorFlag) {
      mainRef?.current?.pause();
      audio.play();
    }
    return () => {
      audio.pause();
      mainRef?.current?.play();
    };
  }, [sponsorFlag, isMuted, mainThemeAudioRef]);

  return (
    <>
      <div className="flex fixed inset-0 z-[1000] h-screen items-center justify-center p-5 md:scale-[200%]  overflow-hidden bg-black bg-opacity-50">
        <HTMLFlipBook
          width={150}
          height={225}
          className=" "
          style={{}}
          startPage={0}
          size={"fixed"}
          minWidth={150}
          maxWidth={400}
          minHeight={225}
          maxHeight={600}
          drawShadow={true}
          flippingTime={500}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.1}
          showCover={false}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={2}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          <div className="">
            <Image
              src="/assets/png/bookCoverTexture.jpg"
              alt="cover"
              width={100}
              height={100}
              className="h-full w-full"
            />
          </div>
          {sponsors.map((page, index) => {
            return (
              <div
                className="bg-[url('/assets/png/pageTexture.jpg')] bg-center bg-cover flex flex-col justify-center items-center w-full"
                key={index}
              >
                {/* <Image
                  src={page.logo}
                  alt={page.name}
                  width={300}
                  height={300}
                  className="h-64 w-64 rounded-lg "
                />
                <p className="text-xl text-amber-900 font-semibold text-center">
                  {page.title}
                </p>
                <p className="text-3xl text-white font-semibold text-center">
                  {page.name}
                </p> */}
              </div>
            );
          })}
          <div className="">
            <Image
              src="/assets/png/bookCoverTexture.jpg"
              alt="cover"
              width={100}
              height={100}
              className="h-full w-full"
            />
          </div>
        </HTMLFlipBook>
      </div>
      <div
        className="fixed lg:top-[15%]  xl:right-[30%] lg:right-[25%] md:right-[20%] sm:right-[15%] top-[25%] right-[10%] z-[1001]  cursor-pointer bg-primary-300 px-2 py-1 rounded-sm"
        style={{ pointerEvents: sponsorFlag ? "all" : "none" }}
        onClick={setSponsorFlag}
      >
        <IoMdClose className="text-lg text-white" />
      </div>
    </>
  );
};

export default BookModal;
