import { User } from '@/src/generated/generated';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { FC, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineEmail, MdPhone } from 'react-icons/md';
import TextAnimation from '../../animation/text';
import { idToPid } from '@/src/utils/id';
import Button from '../../button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GiShipWheel } from 'react-icons/gi';

const ProfileInfo: FC<{
  user: User | null | undefined;
}> = ({ user }) => {
  const router = useRouter();

  if (user?.role === 'USER') {
    router.push('/register');
  }

  return (
    <section data-scroll-section className="text-white min-h-fit py-10 mb-10">
      <div data-scroll className="flex mb-4 items-center justify-center px-5">
        <a
          className={`titleFont text-2xl lg:text-4xl font-bold text-center pr-2`}
        >
          Welcome Sailor!
        </a>
        <GiShipWheel className="text-2xl lg:text-4xl duration-1000 animate-spin-slow" />
      </div>
      <TextAnimation
        text="Ready to dive in?"
        textStyle="text-lg lg:text-2xl bodyFont"
        className="flex items-center justify-center"
      />

      <div className="flex justify-center items-center lg:space-x-20 lg:flex-row flex-col-reverse mt-10">
        <div className="flex px-2 md:text-start text-center flex-col justify-center space-y-2 lg:space-y-6 lg:mt-0 md:mt-5 mt-2 md:text-lg text-sm">
          <a className={`text-3xl lg:text-4xl font-bold titleFont`}>
            {user?.name}
          </a>
          <a className="text-xl lg:text-2xl flex items-center gap-5 bodyFont">
            {user?.college?.name || '-'}
          </a>

          <div className="flex flex-col justify-center items-center md:items-start gap-2 bodyFont">
            <span className="font-bold text-xl">Contact details</span>
            <div className="flex gap-2 items-center">
              <MdOutlineEmail />

              {user?.email}
            </div>
            {user?.phoneNumber && (
              <div className="flex gap-2 items-center">
                <MdPhone />
                {user?.phoneNumber}
              </div>
            )}
            <Button
              onClick={() => signOut()}
              className="mt-2 w-fit"
              intent={'danger'}
            >
              <FaSignOutAlt className="inline-block mr-1" />
              Sign Out
            </Button>
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

              <a className={`titleFont text-[#4d5e57] text-xl p-2 mt-2`}>
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
