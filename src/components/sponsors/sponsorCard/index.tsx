import Image from "next/image";
import React from "react";
import Button from "../../button";
import { FiExternalLink } from "react-icons/fi";
import { Sponsor } from "../sponsorDetails";
import { baseImageUrl } from "@/src/utils/url";

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
      className={`w-full md:max-w-full py-8 px-10 bg-primary-500 border border-primary-200/70 opacity-[0.98] min-h-[300px] mt-3 flex flex-col gap-5 justify-between items-center rounded-2xl text-white ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="relative h-52 w-52 aspect-square flex justify-center items-center">
        <Image
          src={`${baseImageUrl}/sponsors/${sponsor.logo}`}
          fill={true}
          alt={sponsor.name + " logo"}
          className="rounded-2xl object-contain"
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <div className="flex flex-col justify-between items-center gap-2">
          <h2 className="text-3xl text-center">
            {sponsor.name.toLocaleUpperCase()}
          </h2>
          <h3 className="text-xl text-center text-white/70">{sponsor.title}</h3>
        </div>
        <p className="text-slate-300 max-w-prose text-justify leading-7 md:leading-8 text-base md:text-lg">
          {sponsor?.desc}
        </p>
        {sponsor.websiteURL && (
          <a href={sponsor.websiteURL} target="_blank" rel="noreferrer">
            <Button className="w-max" size={"large"}>
              Visit Website <FiExternalLink />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
