import { NextPage } from "next";
import Navbar from '../../components/navbar';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

const Pronite: NextPage = () => {
    const { status, user, error, loading } = useAuth();
    return (
        <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100">
            {/* Navbar */}
            <Navbar status={status} user={user} />
            {/* Header Part */}
            <div className="h-[600px] w-full relative flex bg-black">
                <video
                autoPlay
                loop
                muted
                className="object-cover object-center w-full h-full opacity-75"
                >
                <source src="ocean.mp4" type="video/mp4"></source>
                </video>
                <motion.div
                animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
                transition={{ duration: 3 }}
                className="absolute top-1/2 flex w-full justify-center flex-col"
                >
                <h1 className="text-4xl sm:text-6xl text-center">
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
        </div>
    );
};
export default Pronite;