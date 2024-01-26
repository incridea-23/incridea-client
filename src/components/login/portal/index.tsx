import React, { useState, useEffect, FunctionComponent } from "react";
import FallingElements from "@/src/pages/fallingElements";
import Image from "next/image";

type LoginPortalProps = {
    isTop: boolean;
    src: string;
};

const elements: string[] = [
    "trophy.png",
    "dice.png",
    "sword.png",
    "witchHat.png",
    "pawn.png",
    "pacman.png",
    "sheild.png",
    "bomb.png",
    "coin.png",
    "potion.png",
    "bowArrow.png",
];

const getElement = (): number => {
    return Math.floor(Math.random() * 11); //used to generate a random index from the assets array
};

const getSize = () => {
    let size = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    return { width: size, height: size }; //used to generate a random size everytime an element is made to fall
};

const LoginPortal: FunctionComponent<LoginPortalProps> = ({ isTop, src }) => {
    const [fallingElements, setFallingElements] = useState<React.ReactNode[]>(
        []
    ); //used to append new elements to the falling elements

    useEffect(() => {
        const intervalId = setInterval(() => {
            isTop
                ? setFallingElements((prevElements) => [
                      ...prevElements,
                      <FallingElements
                          src={elements[getElement()]}
                          size={getSize()}
                          key={Date.now()}
                      />,
                  ])
                : null;
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <div className="">
                <Image width={500} height={500} src={src} alt="Portal" />
            </div>

            {/* Portal is rotated +/- 90deg
            <div className="flex justify-center items-center w-full h-[50px] md:h-16 xl:h-20 mb-2">
                <div
                    className={`portal relative bg-gray-600 h-[95vw] w-6 sm:h-[580px] sm:w-7 md:h-[700px] md:w-9 lg:h-[940px] xl:h-[1200px] rounded-[50%] ${
                        isTop ? "rotate-90" : "-rotate-90"
                    } relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 after:top-0 after:right-0 after:bottom-0 after:left-0 before:rounded-[50%] after:rounded-[50%] before:border-l-[4px] before:border-solid before:border-l-[dodgerblue] bg-gradient-to-r from-blue-500 to-transparent before:z-[3] after:border-r-[4px] after:border-solid after:border-r-[dodgerblue] after:shadow-[0_0_40px_dodgerblue] after:z-0`}>
                    {fallingElements}
                </div>
            </div> */}

            {/* Portal is rotated +/- 90deg
            <div
                className={`absolute left-2/4 -translate-x-2/4 -top-2/4 -mt-[38%] -mb-[38%] bg-gray-600 h-80 w-6 sm:h-[580px] sm:w-7 md:h-[700px] lg:h-[940px] xl:h-[1200px] rounded-[50%] ${
                    isTop ? "rotate-90" : "-rotate-90"
                } relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 after:top-0 after:right-0 after:bottom-0 after:left-0 before:rounded-[50%] after:rounded-[50%] before:border-l-[4px] before:border-solid before:border-l-[dodgerblue] bg-gradient-to-r from-blue-500 to-transparent before:z-[3] after:border-r-[4px] after:border-solid after:border-r-[dodgerblue] after:shadow-[0_0_40px_dodgerblue] after:z-0`}>
                {fallingElements}
            </div> */}
        </>
    );
};

export default LoginPortal;
