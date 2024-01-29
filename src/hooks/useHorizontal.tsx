import { useRef, useEffect, RefObject } from "react";

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;

        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + window.innerWidth * (e.deltaY > 0 ? 1 : -1),
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

interface Touch {
  x: number;
  y: number;
}

export function useHorizontalTouch(elRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      let touchStart: Touch | null = null;

      const onTouchStart = (e: TouchEvent) => {
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!touchStart) return;
        const touchEnd = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        const dy = touchEnd.y - touchStart.y;
        const dx = touchEnd.x - touchStart.x;

        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft - window.innerWidth * (dx + dy > 0 ? 1 : -1),
          behavior: "smooth",
        });
      };

      el.addEventListener("touchstart", onTouchStart);
      el.addEventListener("touchmove", onTouchMove);
      return () => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, [elRef]);
}
