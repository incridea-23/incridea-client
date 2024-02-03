import Image from "next/image";
import React from "react";

function Arcade() {
  return (
    <div className="relative aspect-[256/482] h-full w-full">
      {/* <Image
        alt=""
        src="/assets/svg/arcade.svg"
        width={256}
        height={482}
        className="w-full h-full"
        priority
      /> */}
      <div className="w-full h-full"></div>
      <div className="absolute left-1/2 -translate-x-1/2 top-[12%] h-[20%] w-[50%]  ">
        <Image
          height={482}
          width={256}
          className="w-full h-full rounded-lg"
          src="/assets/gif/nosignal.gif"
          alt="no signal"
          priority
        />
      </div>
    </div>
  );
}

export default Arcade;
