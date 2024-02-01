import Image from "next/image";
import React from "react";
import Button from "../../button";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

type SponsorCardProps = {
  sponsor: {
    name: string;
    tier: string;
    desc: string;
    websiteURL: string;
    imageURL: string;
  };
  isEven: boolean;
};

const SponsorCard: React.FunctionComponent<SponsorCardProps> = ({
  sponsor,
  isEven,
}) => {
  return (
    <div
      className={`w-full md:w-[700px] md:max-w-full px-3 py-5 md:p-6 bg-primary-600 min-h-[300px] mt-3 flex flex-col md:flex-row gap-5 justify-between items-center rounded-3xl text-white ${
        isEven ? "self-start" : "self-end"
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 12 }}
        whileTap={{
          scale: 0.8,
          rotate: -10,
          borderRadius: "100%",
        }}
        className="relative h-52 w-52 aspect-square flex justify-center items-center"
      >
        <Image
          src={sponsor?.imageURL}
          fill={true}
          alt={sponsor?.name + " logo"}
          className="rounded-full object-cover"
        />
      </motion.div>
      <div className="flex flex-col items-center justify-between gap-7">
        <div className="flex flex-col justify-between items-center gap-2">
          <h2 className="text-3xl text-center">{sponsor.name}</h2>
          <h3 className="text-xl text-center text-primary-100">
            {sponsor.tier}
          </h3>
        </div>
        <p className="text-center text-slate-300">{sponsor.desc}</p>
        <a href={sponsor.websiteURL} target="_blank" rel="noreferrer">
          <Button className="w-max" size={"large"}>
            Visit Website <FiExternalLink />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default SponsorCard;
