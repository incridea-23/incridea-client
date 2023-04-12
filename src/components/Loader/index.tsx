import { type FC } from "react";
import { motion } from "framer-motion";
import Logo from "./logo";

const Loader:FC = () => {
    return (
        <motion.div
        initial={{opacity:1}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:1,repeat:0}}
        className="flex w-screen h-screen fixed inset-0 bg-gradient-to-bl from-[#41acc9]  via-[#075985] to-[#2d6aa6] z-[9999]">
            <Logo/>
        </motion.div>
    )
}

export default Loader;
