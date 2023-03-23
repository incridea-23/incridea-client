/* eslint-disable @next/next/no-img-element */

import Button from "../button";
import { motion } from "framer-motion";

interface EventProps {
  data: {
    id: string;
    name: string;
    date: string;
    image: string;
    link: string;
    branch: string;
  };
}

const Event = ({ data }: EventProps) => {
  return (
    <motion.div
      style={{ overflow: "hidden" }}
      key={data.id}
      layout
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      className="shadow-md xl:h-[20rem] xl:w-[25rem] lg:h-[15rem] lg:w-[20rem]  rounded-md bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-200 p-4 relative hover:-translate-y-3 transition-all duration-[400] ease-in-out"
    >
      <motion.img
        src={data.image}
        alt={data.name}
        className="w-full object-cover h-[70%] rounded-md"
      />
      <div className="flex flex-col mt-3 xl:space-y-1">
        <span className="text-gray-800 font-bold text-lg">{data.name}</span>
        <span className="text-gray-800 text-sm font-semibold">{data.date}</span>
        <span className="text-gray-800 text-sm font-semibold">
          {data.branch}
        </span>
      </div>
      <Button className="absolute bottom-2 right-2">Register</Button>
    </motion.div>
  );
};

export default Event;
