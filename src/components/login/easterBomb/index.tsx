import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { baseImageUrl } from "@/src/utils/url";

const bombSrc: string = `${baseImageUrl}/assets/png/bomb.png`;
const explodeGIFSrc: string = `${baseImageUrl}/assets/gif/explodeGIF.gif`;

const getPosition: () => number = () => {
  return Math.floor(Math.random() * 80) + 10;
};

const EasterBomb: FunctionComponent = () => {
  const [bombClicked, setBombClicked] = useState<boolean>(false);
  const [left, setLeft] = useState(getPosition());

  const bombRef = useRef<{
    animationPlayState: "running" | "paused";
    src: string;
    pointerEvents: "auto" | "none";
  }>({
    animationPlayState: "running",
    src: bombSrc,
    pointerEvents: "auto",
  });

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bombClickedFromLS =
      localStorage.getItem("easterBombClicked") === "true";

    if (bombClickedFromLS) {
      bombRef.current = {
        animationPlayState: "paused",
        src: explodeGIFSrc,
        pointerEvents: "none",
      };
      if (parentRef.current) parentRef.current.style.display = "none";
      setBombClicked(true);
    }

    setTimeout(() => {
      setInterval(() => {
        setLeft(getPosition());
      }, 15000);
    }, 15000);
  }, []);

  const handleOnClick: () => void = () => {
    if (bombClicked || localStorage.getItem("easterBombClicked") === "true")
      return;

    bombRef.current = {
      animationPlayState: "paused",
      src: explodeGIFSrc,
      pointerEvents: "none",
    };
    localStorage.setItem("easterBombClicked", "true");

    setBombClicked(true);
    setTimeout(() => {
      if (parentRef.current) parentRef.current.style.display = "none";
    }, 1000);
  };

  return (
    <>
      {/* TODO: EasterBomb falls for the first time after 8 seconds of screen load, then if bomb not clicked every 5 seconds, if clicked then never again, given user does not clear local storage */}
      <div
        onClick={handleOnClick}
        ref={parentRef}
        className={
          "absolute animate-[sun-gravity_15s_cubic-bezier(0.33333,0,0.66667,0.33333)_15s_infinite] pointer-events-auto"
        }
        style={{
          top: "0px",
          left: `${left}%`,
          width: "40px",
          height: "40px",
          animationPlayState: bombRef.current.animationPlayState,
        }}
      >
        <BombAsset
          width={!bombClicked ? 40 : 80}
          height={!bombClicked ? 40 : 80}
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
