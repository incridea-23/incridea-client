import { motion, useScroll, useTransform } from "framer-motion";
import { ReactElement } from "react";

const variants = {
  initial: {
    opacity: 0,
  },
  animation: {
    opacity: 1,
  },
};

const Parallax = ({
  children,
  speed,
}: {
  children: ReactElement;
  speed: number;
}) => {
  const { scrollYProgress } = useScroll();
  const transform = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.div
      variants={variants}
      animate="animation"
      style={{ y: transform }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
