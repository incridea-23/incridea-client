import Image from "next/image";
import React, { FC } from "react";

const EventsPeek: FC<{
  speed: number;
}> = ({ speed }) => {
  const images = [
    "Battle_of_Bands_WEB.jpg",
    "Copy of NAVARASA_WithoutContact.png",
    "COUTURE_WEB.jpg",
    "Desafio.jpg",
    "Hogathon.jpg",
    "Knuckle Down.jpg",
    "Stomp That.png",
    "TULU_POSTER_WEB.jpg",
    "usaravalli@3x.jpg",
    "VibeV3.jpg",
  ]; // TODO: Replace with actual images (top 3)

  return (
    <section style={{ transform: "translateX(-60%)" }}>
      <div
        data-scroll
        data-scroll-speed={speed}
        data-scroll-direction="horizontal"
        className="w-[500%] lg:w-[200%] flex gap-2 py-2 items-center backdrop-filter"
      >
        {images.map((i) => {
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
  );
};

export default EventsPeek;
