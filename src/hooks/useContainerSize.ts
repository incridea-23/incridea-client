import { MutableRefObject, useEffect, useState } from "react";

export const useContainerSize = (
  ref: MutableRefObject<HTMLDivElement | null>
): {
  width: number;
  height: number;
} => {
  const [dimention, setDimention] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const getDimention = () => ({
      width: ref.current ? ref.current.offsetWidth : 0,
      height: ref.current ? ref.current.offsetHeight : 0,
    });

    const handleResize = () => {
      setDimention(getDimention());
    };

    ref.current && setDimention(getDimention());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return dimention;
};
