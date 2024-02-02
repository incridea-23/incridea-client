import React, { useState, useEffect } from "react";
import BombPng from "./bombpng";

const getSize = () => {
  let size = Math.floor(Math.random() * (60 - 40)) + 40;
  return { width: size, height: size };
};

const Bomb: React.FC = () => {
  const [fallingElements, setFallingElements] = useState<React.ReactNode[]>([]);
  const [isBombClicked, setIsBombClicked] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isBombClicked) {
        setFallingElements((prev) => [
          ...prev.slice(prev.length < 4 ? 0 : 1),
          <BombPng
            src="bomb.png"
            size={getSize()}
            key={Date.now()}
            setIsBombClicked={setIsBombClicked}
            isBombClicked={isBombClicked}
          />,
        ]);
      }
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isBombClicked]);

  return <>{fallingElements}</>;
};

export default Bomb;
