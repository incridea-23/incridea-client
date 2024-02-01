import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const ScrollLag = ({ children, classes, speed }: { children: JSX.Element, classes: string | undefined, speed: number }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const yPos = useTransform(scrollYProgress, [0, 1], ["0%", speed + "%"])

  return (
    <motion.div ref={ref} style={{ y: yPos }} className={`${classes}`}>
      {children}
    </motion.div>
  )
}

export default ScrollLag