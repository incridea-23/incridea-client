import { type FC } from "react";
import { motion } from "framer-motion";
import Logo from "./logo";
import { GiShipWheel } from "react-icons/gi";

const Loader:FC = () => {
    return (
        <motion.div
        initial={{opacity:1}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:1,repeat:0}}
        className="flex flex-col min-w-screen h-screen fixed inset-0 bg-gradient-to-bl from-[#41acc9]  via-[#075985] to-[#2d6aa6] z-[9999] items-center justify-center">
            <Logo/>
            <motion.div 
            initial={{opacity:0.4 }}
            animate={{opacity:1 }}
            transition={{
              duration: 1.5,
              ease: "easeIn",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="flex text-white/70"> 
                <h1 className={`my-auto text-base md:text-xl bodyFont`} >Loading your experience</h1> 
                {/* <GiShipWheel className="lg:ml-6 ml-3 my-auto text-2xl lg:text-4xl duration-1000 animate-spin-slow" />   */}
            </motion.div>
        </motion.div>
    )
}

export default Loader;
