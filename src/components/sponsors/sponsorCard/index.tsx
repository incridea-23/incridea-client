import Image from "next/image";
import React from "react";
import Button from "../../button";
import { FiExternalLink } from "react-icons/fi";

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
      className={`w-full md:w-[700px] md:max-w-full px-3 py-4 md:p-5 bg-slate-700 min-h-[300px] mt-3 flex flex-col md:flex-row gap-5 justify-between group ${
        isEven ? "self-start" : "self-end"
      }`}>
      <div className="relative w-36 md:w-[200px] group-hover:rotate-12 group-hover:grayscale-[50%] aspect-square">
        <Image
          src={sponsor.imageURL}
          fill={true}
          alt={sponsor.name + " logo"}
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-3xl">{sponsor.name}</h2>
        <p>{sponsor.desc}</p>
        <a href={sponsor.websiteURL} target="_blank">
          <Button className="w-max">
            Visit Website <FiExternalLink />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default SponsorCard;
