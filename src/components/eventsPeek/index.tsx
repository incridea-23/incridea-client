import Image from "next/image";
import React, { FC } from "react";

const EventsPeek: FC<{
  speed: number;
}> = ({ speed }) => {
  const images = [
    "Battle_of_Bands_WEB.jpg", 
    "Copy of NAVARASA_WithoutContact.png",
    "Desafio.jpg",
    "Stomp That.jpg",
    "VibeV3.jpg",
    "COUTURE_WEB.jpg",
    "Knuckle Down.jpg",
    "TULU_POSTER_WEB.jpg",
    "usaravalli@3x.jpg",
    "Hogathon.jpg",
    "Battle_of_Bands_WEB.jpg",
    "Copy of NAVARASA_WithoutContact.png",
    "Desafio.jpg",
    "Stomp That.png",
    "VibeV3.jpg",
    "COUTURE_WEB.jpg",
    "Knuckle Down.jpg",
    "TULU_POSTER_WEB.jpg",
    "usaravalli@3x.jpg",
    "Hogathon.jpg",
  ]; // TODO: Replace with actual images (top 3)

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return !isMobile ? (
    <section style={{ transform: "translateX(-60%)", willChange: "transform" }}>
      <div
        data-scroll
        data-scroll-speed={speed}
        data-scroll-direction="horizontal"
        className="w-[500%] md:w-[350%] lg:w-[250%] flex gap-2 py-2 items-center backdrop-filter">
        {images.slice(0, 10).map((i) => {
          return (
            <div className="flex justify-center items-start gap-5" key={i}>
              <Image
                src={"/assets/Core_Event_Posters/" + i}
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
    <div className="w-full">
      <div className=" m-auto overflow-hidden relative w-auto">
        <ul className="flex w-[calc(250px*20)] animate-scroll">
          {images.map((i) => {
            return (
              <li className="w-[250px] py-2 px-1" key={i}>
                <Image
                  src={"/assets/Core_Event_Posters/" + i}
                  alt="Gallery Image"
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
  );
};

export default EventsPeek;
