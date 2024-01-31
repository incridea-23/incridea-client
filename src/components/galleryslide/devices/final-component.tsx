import Image from "next/image";
import React from "react";

const FinalComponent = () => {
  return (
    <div
      className="w-full text-white flex flex-col items-center"
      id="animation"
    >
      <h1 className="font-bold text-4xl md:text-6xl">Incridea 24</h1>;
      <p className="text-sm md:text-lg">Its your time to make some great memories!</p>
      <Image
        src={"/assets/png/4.png"}
        alt="dice"
        width={50}
        height={50}
        className="origin-center mt-4 cursor-pointer hover:animate-shake"
        onClick={() => {}}
      ></Image>
    </div>
  );
};

export default FinalComponent;
