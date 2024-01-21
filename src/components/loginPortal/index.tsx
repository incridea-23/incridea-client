import React, { useState, useEffect } from "react";
import FallingElements from "@/src/pages/fallingElements";

interface ILPProps {
  isTop: boolean;
}
const elements:string[] =['trophy.png','dice.png','sword.png','witchHat.png','pawn.png','pacman.png','sheild.png','bomb.png'];

const getElement=():number=>{
    return (Math.floor(Math.random() * 8) );
};
const getSize=()=>{
    let size= Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    return {width:size, height:size}
}
const LoginPortal: React.FC<ILPProps> = ({ isTop }: ILPProps) => {
  const [fallingElements, setFallingElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
        isTop? setFallingElements((prevElements) => [...prevElements, <FallingElements src={elements[getElement()]} size={getSize()} key={Date.now()} />]): null;
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  return (
    <>
      <div className="flex justify-center items-center w-full h-[50px] md:h-16 xl:h-20 mb-2">
        {/*Portal is rotated +/- 90deg*/}
        <div
          className={`portal relative bg-gray-600 h-[95vw] w-6 sm:h-[580px] sm:w-7 md:h-[700px] md:w-9 lg:h-[940px] xl:h-[1200px] rounded-[50%] ${
            isTop ? "rotate-90" : "-rotate-90"
          } relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 after:top-0 after:right-0 after:bottom-0 after:left-0 before:rounded-[50%] after:rounded-[50%] before:border-l-[4px] before:border-solid before:border-l-[dodgerblue] bg-gradient-to-r from-blue-500 to-transparent before:z-[3] after:border-r-[4px] after:border-solid after:border-r-[dodgerblue] after:shadow-[0_0_40px_dodgerblue] after:z-0`}
        >
          {fallingElements}
        </div>
      </div>
    </>
  );
};

export default LoginPortal;

