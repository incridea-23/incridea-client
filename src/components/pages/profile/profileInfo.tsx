import { User } from '@/src/generated/generated';
import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { FC } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import { MdOutlineEmail, MdPhone } from 'react-icons/md';
import TextAnimation from '../../animation/text';
import { idToPid } from '@/src/utils/id';

const ProfileInfo: FC<{
  user: User | null | undefined;
}> = ({ user }) => {
  return (
    <section data-scroll-section className="text-white min-h-fit py-10 mb-10">
      <div data-scroll className="flex items-center justify-center">
        <a
          className={`${titleFont.className} text-2xl lg:text-4xl font-bold text-center`}
        >
          Welcome {user?.name}!
        </a>
        <span className="animate-wave text-2xl lg:text-4xl">👋</span>
      </div>
      <br />
      <TextAnimation
        text="Ready to dive in?"
        textStyle="text-lg lg:text-2xl"
        className="flex items-center justify-center"
      />

      <div className="flex justify-center items-center lg:space-x-20 lg:flex-row flex-col-reverse mt-10">
        <div className="flex flex-col justify-center space-y-2 lg:space-y-6 lg:mt-0 md:mt-5 mt-2 md:text-lg text-sm">
          <a
            className={`text-3xl lg:text-5xl font-bold ${titleFont.className}`}
          >
            {user?.name}
          </a>
          <a className="text-md lg:text-2xl flex items-center gap-5">
            <FaUniversity />
            {user?.college?.name}
          </a>
          <a className="text-md lg:text-2xl flex items-center gap-5">
            <BsPersonFill />
            {user?.email.split('@')[0]}
          </a>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <MdOutlineEmail />
              <Link href={`mailto:${user?.email}`} className="hover:underline">
                {user?.email}
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <MdPhone />
              <Link
                href={`tel:${user?.phoneNumber}`}
                className="hover:underline"
              >
                {user?.phoneNumber}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center space-y-5">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={'/assets/png/map.png'}
                width={300}
                height={300}
                alt="map"
                className="opacity-50"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
            >
              <QRCodeSVG
                value={idToPid(user?.id!)}
                size={150}
                bgColor="#9BBAB5"
              />

              <a
                className={`${titleFont.className} text-[#4d5e57] text-xl p-2 mt-2`}
              >
                {idToPid(user?.id!)}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
