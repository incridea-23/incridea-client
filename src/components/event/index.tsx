/* eslint-disable @next/next/no-img-element */

import Button from "../button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface EventProps {
  data: {
    id: string;
    name: string;
    date: string;
    image: string;
    link: string;
    branch: string;
    venue: string;
    rounds: Number;
    price: Number;
  };
}

const Event = ({ data }: EventProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => {
          router.push(`events/${data.id}`);
        }}
        whileHover={{
          translateY: -10,
          // transition: { duration: 0.1 },
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        key={data.id}
        className="bg-white/30 cursor-pointer p-4 rounded-md">
        <motion.img
          src={data.image}
          alt={data.name}
          className="w-full object-cover rounded-md"
        />
        <div className="flex justify-between items-end">
          <div className="flex shrink-0 grow flex-col mt-3 xl:space-y-1.5">
            <span className="text-gray-100 font-bold text-xl">{data.name}</span>
            <span className="text-gray-100 text-sm font-semibold">
              Date: {new Date(data.date).toLocaleDateString("en-UK")}
            </span>
            <span className="text-gray-100 text-sm font-semibold">
              Venue : {data.venue}
            </span>
          </div>
          <Link href={`events/${data.id}`}>
            <Button>{data.price === 0 ? "Free" : `Rs ${data.price}`}</Button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Event;
