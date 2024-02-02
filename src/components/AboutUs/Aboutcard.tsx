import Image from "next/image";
import React from "react";

interface CardProps {
  name: string;
  role: string;
  // desc: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ name, role, url }) => {
  return (
    <div className="group sm:h-96 h-80 my-2 sm:my-0 sm:w-80 w-64 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
            src={url}
            alt=""
            height={400}
            width={400}
          />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/60 px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg capitalize">{role}</p>
            {/* <p className="text-base">{desc}</p>   */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;