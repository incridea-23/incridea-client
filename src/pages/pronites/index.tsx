import { NextPage } from "next";
import Navbar from '../../components/navbar';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import Image from "next/image";

const Pronite: NextPage = () => {
    const { status, user, error, loading } = useAuth();
    return (
        <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100">
            {/* Navbar */}
            <Navbar status={status} user={user} />
            {/* Header Part */}
            {/* <div className="h-[600px] w-full relative flex bg-center bg-[url('https://i.postimg.cc/rwwtdkTQ/pronite-bg.png')] bg-cover"> */}
            <div className="h-[600px] w-full relative flex bg-center bg-[url('/assets/png/pronite_bg.png')] bg-cover">
                <motion.div
                animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
                transition={{ duration: 3 }}
                className="absolute top-1/2 flex w-full justify-center flex-col z-50 py-4 px-2 md:py-2 md:px-8 bg-black/50"
                // className="absolute top-1/2 flex w-full justify-center flex-col z-50"
                >
                <h1 className="text-4xl sm:text-6xl text-center neonText">
                    PRONITES
                </h1>
                <h2 className="text-2xl sm:text-4xl text-center">
                    These are the nights that never die.
                </h2>
                </motion.div>
                <motion.div
                animate={{ y: [30, 0], opacity: [0, 1], repeatCount: 1 }}
                transition={{ duration: 3 }}
                style={{ x: '-50%' }}
                className="h-1 w-40 flex bg-gray-100 absolute bottom-8 left-1/2"
                ></motion.div>
            </div>
            <div className="h-[600px] w-full absolute top-0 left-0 flex bg-center bg-primary-800/40"></div>
            <div className="bg-gradient-to-br from-[#110141]  to-[#040c2b] pt-12">
                
            </div>
        </div>
    );
};
export default Pronite;