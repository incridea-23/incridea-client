import { useScroll, useTransform } from "framer-motion";

const useParallax = (ref: any, speed: number) => {
  const { scrollYProgress } = useScroll({ target: ref });
  const transform = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return transform;
};
export default useParallax;
