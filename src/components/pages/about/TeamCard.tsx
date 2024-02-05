import { VikingHell } from "@/src/pages/_app";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import styles from "./flipCard.module.css";
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
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-black/20 bg-opacity-30 rounded-md p-5 text-center w-full max-w-sm"
    >
      <div className="h-80 flex gap-5">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <div className="flex flex-col items-center gap-8 mt-2 justify-evenly ">
          <a
            href={"https://www.linkedin.com/in/" + linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin size={40} fill="#fff" className="cursor-pointer" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://github.com/" + github}
          >
            <AiFillGithub size={40} fill="#fff" className="cursor-pointer" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              instagram.startsWith("https://youtu.be/")
                ? instagram
                : "https://www.instagram.com/" + instagram
            }
          >
            <AiFillInstagram size={40} fill="#fff" className="cursor-pointer" />
          </a>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <h1 className={`text-white font-bold text-2xl `}>{name}</h1>
        <p className="text-gray-200 text-md bodyFont">{role}</p>
      </div>

      <hr className="border-white/40 my-5" />

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
        <div className="italic font-bold text-white bodyFont">{quote}</div>

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
    </motion.div>
  );
};

export default TeamCard;
