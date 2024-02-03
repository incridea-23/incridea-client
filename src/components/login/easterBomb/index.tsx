import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const bombSrc: string = "/assets/png/bomb.png";
const explodeGIFSrc: string = "/assets/gif/explodeGIF.gif";

const getSize: () => { width: number; height: number } = () => {
  let size = Math.floor(Math.random() * 20) + 40;
  return { width: size, height: size };
};

const getPosition: () => number = () => {
  return Math.floor(Math.random() * 80) + 10;
};

const EasterBomb: FunctionComponent = () => {
  const [bombClicked, setBombClicked] = useState<boolean>(false);
  const [left, setLeft] = useState(getPosition());
  const [size, setSize] = useState(getSize());

  const bombRef = useRef<{
    animationPlayState: "running" | "paused";
    src: string;
    pointerEvents: "auto" | "none";
    display: "initial" | "none";
  }>({
    animationPlayState: "running",
    src: bombSrc,
    pointerEvents: "auto",
    display: "initial",
  });

  useEffect(() => {
    const bombClickedFromLS =
      localStorage.getItem("easterBombClicked") === "true";

    if (bombClickedFromLS) {
      bombRef.current = {
        animationPlayState: "paused",
        src: explodeGIFSrc,
        pointerEvents: "none",
        display: "none",
      };
      setBombClicked(true);
    }

    const intervalID = setInterval(() => {
      setLeft(getPosition());
      setSize(getSize());
      // TODO: 100000 should be same as that in animation duration of free-fall in tailwind.config.js
    }, 10000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const handleOnClick: () => void = () => {
    if (bombClicked || localStorage.getItem("easterBombClicked") === "true")
      return;

    bombRef.current = {
      animationPlayState: "paused",
      src: explodeGIFSrc,
      pointerEvents: "none",
      display: "none",
    };
    localStorage.setItem("easterBombClicked", "true");

    setBombClicked(true);
  };

  return (
    <>
      <div
        onClick={handleOnClick}
        className={"absolute animate-free-fall pointer-events-auto"}
        style={{
          top: "0px",
          left: `${left}%`,
          width: `${size.width}`,
          height: `${size.height}`,
          animationPlayState: bombRef.current.animationPlayState,
          display: "initial",
        }}
      >
        {/* <Image
          src={bombRef.current.src}
          alt={"easterBomb"}
          width={size.width}
          height={size.height}
        /> */}

        <BombAsset
          width={size.width}
          height={size.height}
          src={!bombClicked ? bombSrc : explodeGIFSrc}
        />
      </div>
    </>
  );
};

export default EasterBomb;

const BombAsset: FunctionComponent<{
  src: string;
  width: number;
  height: number;
}> = ({ src, width, height }) => {
  return <Image src={src} alt={"easterBomb"} width={width} height={height} />;
};
