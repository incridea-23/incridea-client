// import { User } from '@/src/generated/generated';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { QRCodeSVG } from 'qrcode.react';
// import { FC, useEffect } from 'react';
// import { FaSignOutAlt, FaDice } from 'react-icons/fa';
// import { MdOutlineEmail, MdPhone } from 'react-icons/md';
// import TextAnimation from '../../animation/text';
// import { idToPid } from '@/src/utils/id';
// import Button from '../../button';
// import { signOut } from 'next-auth/react';
// import { useRouter } from 'next/router';
// // import { GiShipWheel } from 'react-icons/gi';

// const ProfileInfo: FC<{
//   user: User | null | undefined;
// }> = ({ user }) => {
//   const router = useRouter();

//   if (user?.role === 'USER') {
//     router.push('/register');
//   }

//   return (
//     <section className="p-0 text-white h-full flex justify-center items-center">
//       {/* <div className="flex mb-4 items-center justify-center px-5">
//         <a
//           className={`titleFont text-2xl lg:text-4xl font-bold text-center pr-2`}
//         >
//           Welcome Gamer!
//         </a>
//         <FaDice className="text-3xl lg:text-6xl animate-bounce-and-spin" />
//       </div> */}
//       {/* <TextAnimation
//         text="Ready to begin?"
//         textStyle="text-lg lg:text-2xl bodyFont"
//         className="flex items-center justify-center"
//       /> */}

//  <div className='flex flex-col h-full px-2 lg:pt-0 pt-20 justify-center items-center'>
//   <div className='flex flex-row items-center'>

//       {/* /profile picture ka div */}
//       <div className='justify-center items-start flex'>
//            <Image
//                 src={'/assets/png/c.png'}
//                 width={150}
//                 height={150}
//                 alt="map"
//               />
//       </div>

//       {/* //contents ka div */}
//       <div className='flex flex-col px-4'>
//             <a className={`text-xl font-bold titleFont`}>
//             {user?.name}
//           </a>
//           <a className="text-sm flex items-center gap-5 bodyFont">
//             {user?.college?.name || '-'}
//           </a>
//           {/* <span className="font-bold text-xl">Contact details</span> */}
//           <div className="flex gap-2 items-center">
//               <MdOutlineEmail />

//               {user?.email}
//             </div>
//              {user?.phoneNumber && (
//               <div className="flex gap-2 items-center">
//                 <MdPhone />
//                 {user?.phoneNumber}
//               </div>
//             )}
//             <Button
//               onClick={() => signOut()}
//               className="mt-1 w-fit"
//               intent={'danger'}
//             > <FaSignOutAlt className="inline-block mr-1" />
//               Sign Out
//             </Button>

//       </div>

//   </div>
//   <div className='flex flex-row justify-around items-center w-full mt-5'>
//       {/* //leaderboard and level div */}
//       <div className='flex flex-row space-x-1'>

//                 <Image
//                 src={'/assets/png/trophy.png'}
//                 width={45}
//                 height={45}
//                 alt="map"

//                 />

//             <div className=''>
//                 <p className='text-sm'>leaderboard</p>
//                 <p>80/100</p>
//             </div>
//       </div>

//       <div className='flex flex-row space-x-1'>

//                 <Image
//                 src={'/assets/png/money.png'}
//                 width={45}
//                 height={50}
//                 alt="map"

//               />

//             <div className=''>
//                 <p className='text-sm'>coins</p>
//                 <p>100</p>
//             </div>
//       </div>

//       <div className='flex flex-row space-x-1'>

//                 <Image
//                 src={'/assets/png/level.png'}
//                 width={45}
//                 height={45}
//                 alt="map"

//               />

//             <div className=''>
//                 <p className='text-sm'>level</p>
//                 <p>3</p>
//             </div>
//       </div>
//   </div>

//   <div className='flex flex-col text-center text-white justify-center items-center mt-5'>
//       {/* qr code div*/}
//       <div>
//       {/* <p className='mb-5 text-base font-bold'>My destiny card...</p> */}
//               <div className=''><QRCodeSVG
//                 value={idToPid(user?.id!)}
//                 size={120}
//                 bgColor="#fff"
//               /></div>
//                <a className={`titleFont text-[#fff] text-xl p-2 mt-5`}>
//                 {idToPid(user?.id!)}
//               </a>
//         </div>
//   </div>
// </div>
//     </section>
//   );
// };

// export default ProfileInfo;
import {
  AccommodationRequestsByUserDocument,
  GetUserXpDocument,
  GetXpLeaderboardDocument,
  User,
} from "@/src/generated/generated";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { FC, useEffect, useState } from "react";
import { FaSignOutAlt, FaDice } from "react-icons/fa";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import TextAnimation from "../../animation/text";
import { idToPid } from "@/src/utils/id";
import Button from "../../button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Spinner from "../../spinner";
import ViewUserAccommodation from "./viewUserAccommodation";
// import { GiShipWheel } from 'react-icons/gi';

const ProfileInfo: FC<{
  user: User | null | undefined;
}> = ({ user }) => {
  const router = useRouter();
  const {
    data: dataAccommodation,
    loading: loadingAccommodation,
    error: errorAccommodation,
  } = useQuery(AccommodationRequestsByUserDocument);

  const [showModal, setShowModal] = useState(false);

  // if (user?.role === "USER") {
  //   router.push("/register");
  // }

  //   return (
  //     <section className="text-white h-full flex pt-20 lg:w-full lg:pt-0 justify-center items-center">

  //  <div className='flex flex-col h-full px-2 lg:p-3 lg:pt-0 justify-center items-start'>
  //   <div className='flex flex-row 2xl:flex-col items-center'>

  //       {/* /profile picture ka div */}
  //       <div className='justify-center items-start flex'>
  //            <Image
  //                 src={'/assets/png/c.png'}
  //                 width={130}
  //                 height={130}
  //                 alt="map"
  //               />
  //       </div>

  //       {/* //contents ka div */}
  //       <div className='flex flex-col px-4'>
  //             <a className={`text-xl font-bold titleFont`}>
  //             {user?.name}
  //           </a>
  //           <a className="text-sm flex items-center gap-5 bodyFont">
  //             {user?.college?.name || '-'}
  //           </a>
  // {/* <Button
  //   onClick={() => signOut()}
  //   className="mt-1 w-fit"
  //   intent={'primary'}
  // > <FaSignOutAlt className="inline-block mr-1" />
  //   Sign Out
  // </Button> */}
  //       <ViewUserAccommodation
  //   showModal={showModal}
  //   setShowModal={setShowModal}
  // />
  //             {
  //               loadingAccommodation ? (
  //                 <Button size={'small'} onClick={()=>setShowModal(true)} className="w-max mt-3 md:mt-2"><Spinner size={'small'} className="text-[#dd5c6e]" /></Button>

  //               ) : dataAccommodation?.accommodationRequestsByUser[0]?.status?
  //               (<Button size={'small'} onClick={()=>setShowModal(true)} className="w-max mt-3 md:mt-2">View Request</Button>):
  //             (<Button size={'small'} onClick={()=>router.push("/accommodation")} className="w-max mt-3 md:mt-2">Accommodate Me</Button>)
  //             }

  //       </div>

  //   </div>
  //   <div className='flex lg:flex-row justify-around space-x-5 items-center w-full  mt-3'>
  //       {/* //leaderboard and level div */}
  // <div className='flex flex-row'>

  //           <Image
  //           src={'/assets/png/trophy.png'}
  //           width={45}
  //           height={65}
  //           alt="map"
  //           className='h-full w-full'
  //           />

  //       <div className=''>
  //           <p className='text-sm'>Leaderboard</p>
  //           <p>80/100</p>
  //       </div>
  // </div>

  // <div className='flex flex-row space-x-1'>

  //           <Image
  //           src={'/assets/png/coin.png'}
  //           width={45}
  //           height={50}
  //           alt="map"

  //         />

  //       <div className=''>
  //           <p className='text-sm'>Gold</p>
  //           <p>100</p>
  //       </div>
  // </div>

  // <div className='flex flex-row space-x-1'>

  //           <Image
  //           src={'/assets/png/level.png'}
  //           width={45}
  //           height={45}
  //           alt="map"

  //         />

  //       <div className=''>
  //           <p className='text-sm'>Level</p>
  //           <p>3</p>
  //       </div>
  //       </div>
  //   </div>

  //   <div className='flex flex-row text-white justify-between items-center w-full px-3 mt-3'>
  //       <div className='flex justify-end h-full flex-col'>
  //       <p className="font-bold text-sm px-0">Contact details:</p>
  //       <div className="flex gap-2 items-center">
  //  <MdOutlineEmail />

  //   {user?.email}
  //            </div>
  //             {user?.phoneNumber && (
  //               <div className="flex gap-2 items-center">
  //  <MdPhone />
  //  {user?.phoneNumber}
  //                </div>
  //              )}
  //            <div className=''>
  //             <Button
  //               onClick={() => signOut()}
  //               className="mt-1 w-fit"
  //               intent={'danger'}
  //               size={'small'}
  //             > <FaSignOutAlt className="inline-block #dc2626" />
  //               Sign Out
  //             </Button> </div>
  //       </div>
  //       {/* qr code div*/}
  // <div>
  //         <div className=''><QRCodeSVG
  //           value={idToPid(user?.id!)}
  //           size={110}
  //           bgColor="transparent"
  //           color="#ffffff"
  //   fgColor="#ffffff"
  //         /></div>
  //          <a className={`titleFont text-[#fff] text-lg  mt-5`}>
  //           {idToPid(user?.id!)}
  //         </a>
  //   </div>
  //   </div>
  // </div>
  //     </section>
  //   );

  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [userId, setUser] = useState('');
  const [rank, setRank] = useState(0);

  const userXp = useQuery(GetUserXpDocument,{});
  useEffect(() => {
    if (userXp?.data && userXp.data.getUserXp.__typename === "QueryGetUserXpSuccess") {
      setLevel(userXp.data.getUserXp?.data?.length);
      setXp(userXp.data.getUserXp?.data?.reduce((acc, curr) => acc + curr.level.point, 0));
      setUser(userXp.data.getUserXp?.data[0]?.user.id);
    }
  }, [userXp.data]);

  interface UserTotalPoints {
    [userId: string]: {
        levelPoints: number;
        name: string;
        count: number;
    }
  }
const{
    data: Leaderboard,
    loading: leaderboardLoading,
}  = useQuery(GetXpLeaderboardDocument,{})

const [sortedLeaderboard, setSortedLeaderboard] = useState< {
    levelPoints: number;
    name: string;
    userId: string;
    count: number;
}[]>([]);

useEffect(() => {
    if(Leaderboard?.getXpLeaderboard.__typename === "QueryGetXpLeaderboardSuccess"){
      const userTotalPoints: UserTotalPoints = {};

      Leaderboard?.getXpLeaderboard.data.forEach((item) => {
        const userId: string = item.user.id;
        const levelPoints: number = item.level.point;
        const userName: string = item.user.name;
        const levelCount: number = 1;

        // Check if the user ID is already in the userTotalPoints object
        if (userTotalPoints[userId]) {
          // If yes, add the level points to the existing total
            userTotalPoints[userId].levelPoints += levelPoints;
            userTotalPoints[userId].count += levelCount;
        } else {
          // If no, create a new entry for the user ID
            userTotalPoints[userId] = {
                levelPoints,
                name: userName,
                count: 1
            };
        }
      });
    // Convert userTotalPoints to an array of objects
    const userTotalPointsArray = Object.entries(userTotalPoints).map(([userId, data]) => ({
        userId,
        ...data,
    }));

    // Sort the array in descending order based on total points
    userTotalPointsArray.sort((a, b) => b.levelPoints - a.levelPoints);
    console.log(userTotalPointsArray);
    // get current user's rank
    const currentUserRank = userTotalPointsArray.findIndex((user) => user.userId === userId);
    console.log(currentUserRank);
    setRank(currentUserRank + 1);
  }
}, [Leaderboard,userId]);

  return (
    <>
      <div className="text-white flex flex-col justify-between items-center h-full px-8 py-16 gap-y-8 border-2 border-slate-400 rounded-xl">
        <div className="flex gap-5">
          <Image
            src={"/assets/png/avatar.png"}
            width={200}
            height={200}
            alt="avatar"
            className="lg:h-48 lg:w-48 md:h-36 md:w-36 w-28 h-28  rounded-full"
          />
          <section className="flex flex-col text-center h-full items-center justify-center space-y-4">
            <span className="titleFont lg:text-[2.5rem] sm:text-3xl text-2xl  font-bold">
              {user?.name}
            </span>
            <span className="bodyFont sm:text-xl text-md">
              {user?.college?.name || "-"}
            </span>
          </section>
        </div>

        <div className="flex justify-evenly w-full titleFont basis-1/3  flex-wrap">
          <div className="flex flex-row items-center space-x-2">
            <Image
              src={"/assets/png/trophy.png"}
              width={100}
              height={100}
              alt="map"
              className="sm:h-16 sm:w-16 h-12 w-12"
            />

            <div className="lg">
              <p className="">Leaderboard</p>
              <p>{rank}</p>
            </div>
          </div>

          <div className="flex flex-row space-x-2 items-center titleFont">
            <Image
              src={"/assets/png/XP.webp"}
              width={100}
              height={100}
              alt="map"
              className="sm:h-16 sm:w-16 h-12 w-12"
            />

            <div className="text-lg">
              <p className="">XP</p>
              <p>{xp}</p>
            </div>
          </div>

          <div className="flex flex-row space-x-1 items-center">
            <Image
              src={"/assets/png/level.png"}
              width={100}
              height={100}
              alt="map"
              className="sm:h-16 sm:w-16 h-12 w-12"
            />

            <div className="lg">
              <p className="">Level</p>
              <p>{level}</p>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col-reverse gap-5 justify-between w-full items-center basis-1/2">
          <section className="flex flex-col gap-y-4 sm:items-start items-center justify-center w-full">
            <p className="flex flex-col justify-center gap-y-4">
              <span className="sm:text-2xl text-xl text-center font-semibold">
                Contact
              </span>
              <div className="flex flex-col gap-y-2 sm:text-lg text-md">
                <span className="flex gap-x-2 items-center">
                  <MdOutlineEmail />
                  {user?.email}
                </span>
                <span className="flex gap-x-2 items-center">
                  <MdPhone />
                  {user?.phoneNumber}
                </span>
              </div>
            </p>
            <div>
              <ViewUserAccommodation
                showModal={showModal}
                setShowModal={setShowModal}
              />
              {loadingAccommodation ? (
                <Button
                  size={"large"}
                  onClick={() => setShowModal(true)}
                  className="w-max mt-3 md:mt-2"
                >
                  <Spinner size={"small"} className="text-[#dd5c6e]" />
                </Button>
              ) : dataAccommodation?.accommodationRequestsByUser[0]?.status ? (
                <Button
                  intent={"info"}
                  size={"large"}
                  onClick={() => setShowModal(true)}
                  className="w-max mt-3 md:mt-2"
                >
                  View Request
                </Button>
              ) : (
                <Button
                  intent={"success"}
                  size={"large"}
                  onClick={() => router.push("/accommodation")}
                  className="w-max mt-3 md:mt-2"
                >
                  Accommodation
                </Button>
              )}

              <Button
                onClick={() => signOut()}
                className="mt-1 w-full"
                intent={"danger"}
                size={"large"}
              >
                <FaSignOutAlt className="inline-block mr-1" />
                Sign Out
              </Button>
            </div>
          </section>

          <div className="flex flex-col w-full justify-center h-full items-center gap-y-3 ">
            <QRCodeSVG
              value={idToPid(user?.id!)}
              size={100}
              bgColor="transparent"
              color="#ffffff"
              fgColor="#ffffff"
              className="h-44 w-44"
            />
            <span className={`titleFont text-[#fff] sm:text-xl text-md`}>
              {idToPid(user?.id!)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
