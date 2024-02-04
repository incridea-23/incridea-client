import Image from "next/image";
import React from "react";
import Button from "../../button";
import { FiExternalLink } from "react-icons/fi";
import { Sponsor } from "../sponsorDetails";

type SponsorCardProps = {
  sponsor: Sponsor;
  isEven: boolean;
};

const SponsorCard: React.FunctionComponent<SponsorCardProps> = ({
  sponsor,
  isEven,
}) => {
  return (
    <div
      className={`w-full md:w-[700px] md:max-w-full p-6 md:p-7 from-[#da0983] to-[#6b24bc] opacity-[0.98] min-h-[300px] mt-3 flex flex-col md:flex-row gap-5 justify-between items-center rounded-3xl text-white ${
        isEven ? "self-start bg-gradient-to-tr" : "self-end bg-gradient-to-tl"
      }`}
    >
      <div className="relative h-52 w-52 aspect-square flex justify-center items-center">
        <Image
          src={sponsor?.imageURL}
          fill={true}
          alt={sponsor?.name + " logo"}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <div className="flex flex-col justify-between items-center gap-2">
          <h2 className="text-3xl text-center">{sponsor?.name}</h2>
          <h3 className="text-xl text-center text-white/70">{sponsor?.tier}</h3>
        </div>
        <p className="text-center text-slate-300">{sponsor?.desc}</p>
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
