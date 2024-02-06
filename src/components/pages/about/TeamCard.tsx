import { VikingHell } from "@/src/pages/_app";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { RiLinkedinFill } from "react-icons/ri";
import styles from "./flipCard.module.css";
import { baseImageUrl } from "@/src/utils/url";
const TeamCard: FC<{
  name: string;
  role: string;
  image: string;
  linkedin: string;
  instagram: string;
  github: string;
  quote: string;
  avatar: string;
}> = ({ name, role, linkedin, github, quote, instagram, image, avatar }) => {
  return (
    <div className="hover:scale-[1.02] w-[20rem] bg-primary-500 border border-primary-200/70 px-5 pt-5 rounded-xl flex gap-4 duration-200">
      <div className="flex flex-col gap-4 w-full h-full">
        <Image
          src={`${baseImageUrl}/` + image}
          alt={name}
          height={300}
          width={300}
          className="w-[18rem] aspect-square object-cover top-0 rounded-xl "
        />
        <div>
          <h3 className="text-center text-3xl text-white font-VikingHell tracking-wide">
            {name}
          </h3>
          <h1 className="text-center text-xl text-white font-semibold">
            {role}
          </h1>
        </div>

        <div className="flex justify-evenly w-full">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-300 rounded-full p-2 hover:scale-105 duration-300 "
          >
            <AiFillGithub className=" text-white" size={20} />
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-300 rounded-full p-2 hover:scale-105 duration-300"
          >
            <AiFillInstagram className="text-white" size={20} />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-300 rounded-full p-2 hover:scale-105 duration-300"
          >
            <RiLinkedinFill className="text-white" size={20} />
          </a>
        </div>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="w-12 h-12 mb-3 text-white opacity-30"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <div className="italic font-bold text-white bodyFont text-center">
            {quote}
          </div>

          <div className="flex justify-end">
            <svg
              aria-hidden="true"
              className="w-12 h-12 mb-3 text-white opacity-30 rotate-180"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
