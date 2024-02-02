import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

const element: string = "bomb.png";

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

  useEffect(() => {
    setBombClicked(localStorage.getItem("easterBombClicked") === "true");
    setInterval(() => {
      setLeft(getPosition());
      setSize(getSize());
      // TODO: 100000 should be same as that in animation duration of free-fall in tailwind.config.js
    }, 10000);
  }, []);

  const handleOnClick: () => void = () => {
    if (bombClicked || localStorage.getItem("easterBombClicked") === "true")
      return;

    setTimeout(() => {
      setBombClicked(true);
      // TODO: Make sure this duration is not too greater than the time needed for the bomb blast animation
    }, 1000);

    console.log("cute");
    localStorage.setItem("easterBombClicked", "true");
  };

  return (
    <>
      {!bombClicked && (
        <div
          onClick={handleOnClick}
          className={"absolute animate-free-fall"}
          style={{
            top: "0px",
            left: `${left}%`,
            width: `${size.width}`,
            height: `${size.height}`,
          }}
        >
          <Image
            src={`/assets/png/${element}`}
            alt={"easterBomb"}
            width={size.width}
            height={size.height}
          />
        </div>
      )}
    </>
  );
};

export default EasterBomb;
