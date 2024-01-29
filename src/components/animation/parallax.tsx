import { motion, useScroll, useTransform } from "framer-motion";
import { ReactElement } from "react";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Parallax = ({
  children,
  speed,
  parentRef,
}: {
  children: ReactElement;
  speed: number;
  parentRef: any;
}) => {
  const { scrollYProgress } = useScroll({ target: parentRef });
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * speed, 100 * speed]
  );

  return (
    <motion.div className="" variants={variants} style={{ y: transform }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
