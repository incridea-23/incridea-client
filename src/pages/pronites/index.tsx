import { NextPage } from "next";
import Navbar from '../../components/navbar';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import React from "react";

const Pronite: NextPage = () => {
    const artArray=[
        {'reverse':false,'artistname':'Raghav Chaitanya','imagesrc':'/assets/png/artist1.png','date':'26th April 2023','time':'9pm'},
        {'reverse':true,'artistname':'Unknown artist','imagesrc':'/assets/png/unknown.png','date':'Revealing soon','time':'Xpm'},
        {'reverse':false,'artistname':'Unknown artist','imagesrc':'/assets/png/unknownB.png','date':'Revealing soon','time':'Xpm'}
    ]
    const [artists,setArtists] = React.useState(artArray);
    const { status, user, error, loading } = useAuth();
    return (
        <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto text-gray-100">
            {/* Navbar */}
            <Navbar status={status} user={user} />
            {/* Header Part */}
            {/* <div className="h-[600px] w-full relative flex bg-center bg-[url('https://i.postimg.cc/rwwtdkTQ/pronite-bg.png')] bg-cover"> */}
            <div className="h-[600px] w-full relative flex bg-center bg-[url('/assets/png/pronite_bg.png')] bg-cover">
                <motion.div
                animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
                transition={{ duration: 3 }}
                className="absolute z-10 flex flex-col justify-center w-full px-2 py-4 top-1/2 md:py-2 md:px-8 bg-black/50"
                // className="absolute z-50 flex flex-col justify-center w-full top-1/2"
                >
                <h1 className="text-4xl text-center sm:text-6xl neonText">
                    PRONITES
                </h1>
                <h2 className="text-2xl text-center sm:text-4xl">
                    These are the nights that never die.
                </h2>
                </motion.div>
                <motion.div
                animate={{ y: [30, 0], opacity: [0, 1], repeatCount: 1 }}
                transition={{ duration: 3 }}
                style={{ x: '-50%' }}
                className="absolute flex w-40 h-1 bg-gray-100 bottom-8 left-1/2"
                ></motion.div>
            </div>
            <div className="h-[600px] w-full absolute top-0 left-0 flex bg-center bg-primary-800/40"></div>
            <div className="bg-gradient-to-br from-[#110141]  to-[#040c2b] pt-12 pb-12">
                {
                    artists?.map((artist,index)=>(
                        <ArtistsCard key={index} reverse={artist.reverse} src={artist.imagesrc} artistname={artist.artistname} date={artist.date} time={artist.time}/>
                    ))
                }
            </div>
        </div>
    );
};
export default Pronite;

function ArtistsCard(props: {
    reverse: Boolean; src: string ; artistname: string; date: string; time: string 
}){
    return(
        <div className={`${props.reverse?" md:flex-row-reverse" :"" } flex flex-col items-center justify-center p-3 mx-auto text-base ease-in-out border-2 md:gap-0 md:max-w-sm md:px-10 lg:max-w-md xl:max-w-xl md:flex-row border-slate-500/50 transform-color ease-liner md:p-5 rounded-xl backdrop-blur md:border-none md:bg-none mb-6 `}>
            <div className={`flex-1 ${props.reverse?"lg:translate-x-20":"lg:-translate-x-20"} w-auto md:p-0`}>
                <div className="absolute right-0 bottom-0 h-3/4 w-full clip-div "></div>
                <img src={props.src} alt="artist" className="img-shadow m-2 max-h-80 md:max-w-lg"/>
            </div>
            <motion.div
                    whileInView={ { y: [20, 0], opacity: [0, 1], repeatCount: 1, z:5 }}
                    transition={{ duration: 3 }}>
                <div className="flex-2 p-6 m-4 max-w-fit neonBorder bg-[#110141]">
                    <h1 className="text-4xl text-center sm:text-6xl neonText">{props.artistname}</h1>
                    <p className="text-2xl text-center">{props.date}<br/>
                    @ {props.time}</p>
                </div>
            </motion.div>
        </div>
    )
}