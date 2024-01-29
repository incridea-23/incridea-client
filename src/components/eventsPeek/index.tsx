import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";
import React, { FC } from "react";

const EventsPeek: FC<{
  speed: number;
}> = ({ speed }) => {
  const images = [
    "Battle_of_Bands_WEB.jpg",
    "Copy_of_NAVARASA_WithoutContact.png",
    "Desafio.jpg",
    "Stomp_That.jpg",
    "VibeV3.jpg",
    "COUTURE_WEB.jpg",
    "Knuckle_Down.jpg",
    "TULU_POSTER_WEB.jpg",
    "usaravalli_3x.jpg",
    "Hogathon.jpg",
    "Battle_of_Bands_WEB.jpg",
    "Copy_of_NAVARASA_WithoutContact.png",
    "Desafio.jpg",
    "Stomp_That.jpg",
    "VibeV3.jpg",
    "COUTURE_WEB.jpg",
    "Knuckle_Down.jpg",
    "TULU_POSTER_WEB.jpg",
    "usaravalli_3x.jpg",
    "Hogathon.jpg",
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return !isMobile ? (
    <section style={{ transform: "translateX(-60%)", willChange: "transform" }}>
      <div
        data-scroll
        data-scroll-speed={speed}
        data-scroll-direction="horizontal"
        className="w-[500%] md:w-[350%] lg:w-[250%] flex gap-2 py-2 items-center backdrop-filter">
        {images.slice(0, 10).map((i, idx) => {
          return (
            <div className="flex justify-center items-start gap-5" key={idx}>
              <Image
                src={baseImageUrl + "/assets/Core_Event_Posters/" + i}
                alt="Gallery Image"
                width={500}
                height={300}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-blue-300 bg-opacity-[3%]"></div>
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <>
      <div className="w-full relative">
        <div className="py-2 m-auto rotate-[15deg] overflow-hidden relative top-28 right-20 w-[200%]">
          <ul
            className="flex w-[calc(250px*20)] animate-scroll-reverse"
            style={{
              transition: "all",
              willChange: "translate, transform",
              transitionDelay: "10ms",
              transitionTimingFunction: "ease-in-out",
            }}>
            {images.map((i, idx) => {
              return (
                <li className="w-[250px] py-2 px-1" key={idx}>
                  <Image
                    src={baseImageUrl + "/assets/Core_Event_Posters/" + i}
                    alt={i.slice(0, i.indexOf("."))}
                    width={500}
                    height={300}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-300 bg-opacity-[1%]"></div>
                </li>
              );
            })}
          </ul>
        <div className="absolute h-full w-[200%] py-10 inset-0 backdrop-blur-sm"></div>
        </div>

        <div className="py-2 m-auto -rotate-[15deg] overflow-hidden relative -top-36 right-20 w-[200%]">
          <ul
            className="flex w-[calc(250px*20)] animate-scroll"
            style={{
              transition: "all",
              willChange: "translate, transform",
              transitionDelay: "10ms",
              transitionTimingFunction: "ease-in-out",
            }}>
            {images.map((i, idx) => {
              return (
                <li className="w-[250px] py-2 px-1" key={idx}>
                  <Image
                    src={baseImageUrl + "/assets/Core_Event_Posters/" + i}
                    alt={i.slice(0, i.indexOf("."))}
                    width={500}
                    height={300}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-300 bg-opacity-[1%]"></div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventsPeek;
