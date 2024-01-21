import { useEffect, useState } from "react";

export const useWindowSize = (): {
  width: number;
  height: number;
} => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const windowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", windowResize);

    windowResize();

    return () => window.removeEventListener("resize", windowResize);
  }, []);

  return windowSize;
};
