import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import FallingElement from './fallingElement';

type srcProps = {
    /* src: string
    size: { width: number, height: number } */
    isTop:boolean
}
const getPosition = () => {
    /* used to generate the point from where the element should fall */
    /* in a range of 0% to 100% of portal width */
    return { position: Math.floor(Math.random() * (90 - 10 + 1)) + 10 };
}

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

const FallingElements: React.FC<srcProps> = (/* { src, size, isTop }: srcProps */{isTop}) => {
    const [fallingElements, setFallingElements] = useState<React.ReactNode[]>(
        []
    ); //used to append new elements to the falling elements

    useEffect(() => {
        const intervalId = setInterval(() => {
            isTop
                ? setFallingElements((prevElements) => [
                      ...prevElements,
                      <FallingElement
                          src={elements[getElement()]}
                          size={getSize()}
                          key={Date.now()}
                      />,
                  ])
                : null;
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <>
            {/* <div className={` absolute animate-[fall_10s_linear_forwards]`}
                style={{ top: `${getPosition().position}%`, width: `${size.width}px`, height: `${size.height}px` }}

            ><Image src={`/assets/png/${src}`} alt={src} width={size.width} height={size.height} /></div> */}
            <div>
                {fallingElements}
            </div>
        </>
    )

}

export default FallingElements