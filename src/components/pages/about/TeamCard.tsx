import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const TeamCard: FC<{
  name: string;
  role: string;
  linkedin: string;
  github: string;
  quote: string;
}> = ({ name, role, linkedin, github, quote }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white bg-opacity-30 rounded-md p-5 text-center max-w-sm"
    >
      <div className="flex justify-center">
        <Image
          src="https://incridemo.web.app/events/EC/SHARKTANK.jpg"
          alt="Incridea Banner"
          width={250}
          height={250}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col mt-2">
        <h1 className="text-white font-bold text-2xl">{name}</h1>
        <p className="text-gray-200 text-md">{role}</p>
      </div>

      <div className="flex gap-2 mt-2 justify-center">
        <Link href={linkedin}>
          <AiFillLinkedin size={30} fill="#fff" className="cursor-pointer" />
        </Link>
        <Link href={github}>
          <AiFillGithub size={30} fill="#fff" className="cursor-pointer" />
        </Link>
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
        <div className="italic font-bold text-white">{quote}</div>

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
