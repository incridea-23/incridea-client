import Image from "next/image";
import React, { FC } from "react";
import { motion,MotionValue } from "framer-motion";

const EventsPeek: FC<{
  speed: number;
  y:MotionValue<string>;
}> = ({ speed,y }) => {
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
  ];


  return(
    <section className="flex" >
      <motion.div
      style={{translateX:y}}
      className="flex"
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
      </motion.div>
    </section>
  )

  // return (
  //   <section style={{  }}>
  //     <motion.div
  //       style={{y}}
  //       // data-scroll
  //       // data-scroll-speed={speed}
  //       // data-scroll-direction="horizontal"
  //       className="w-[500%] md:w-[350%] lg:w-[250%] flex gap-2 py-2 items-center backdrop-filter"
  //     >
  //       {images.map((i) => {
  //         return (
  //           <div className="flex justify-center items-start gap-5" key={i}>
  //             <Image
  //               src={"/assets/Core_Event_Posters/" + i}
  //               alt="Gallery Image"
  //               width={500}
  //               height={300}
  //             />
  //             <div className="absolute top-0 left-0 w-full h-full bg-blue-300 bg-opacity-[3%]"></div>
  //           </div>
  //         );
  //       })}
  //     </motion.div>
  //   </section>
  // );
};

export default EventsPeek;
