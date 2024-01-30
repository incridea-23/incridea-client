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
import { User } from '@/src/generated/generated';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { FC, useEffect } from 'react';
import { FaSignOutAlt, FaDice } from 'react-icons/fa';
import { MdOutlineEmail, MdPhone } from 'react-icons/md';
import TextAnimation from '../../animation/text';
import { idToPid } from '@/src/utils/id';
import Button from '../../button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
// import { GiShipWheel } from 'react-icons/gi';

const ProfileInfo: FC<{
  user: User | null | undefined;
}> = ({ user }) => {
  const router = useRouter();

  if (user?.role === 'USER') {
    router.push('/register');
  }

  return (
    <section className="text-white h-full flex pt-20 lg:w-full lg:pt-0 justify-center items-center">
 

 <div className='flex flex-col h-full px-2 lg:px-0 lg:pt-0 justify-center items-start'>
  <div className='flex flex-row 2xl:flex-col  items-center'>

      {/* /profile picture ka div */}
      <div className='justify-center items-start flex'>
           <Image
                src={'/assets/png/c.png'}
                width={150}
                height={150}
                alt="map"
              />
      </div>

      

      {/* //contents ka div */}
      <div className='flex flex-col px-4'>
            <a className={`text-3xl font-bold titleFont`}>
            {user?.name}
          </a>
          <a className="text-sm flex items-center gap-5 bodyFont">
            {user?.college?.name || '-'}
          </a>
            <Button
              onClick={() => signOut()}
              className="mt-1 w-fit"
              intent={'danger'}
            > <FaSignOutAlt className="inline-block mr-1" />
              Sign Out
            </Button>

      </div>

       

  </div>
  <div className='flex lg:flex-row justify-around space-x-5 items-center w-full  mt-3'>
      {/* //leaderboard and level div */}
      <div className='flex flex-row'>
          
                <Image
                src={'/assets/png/trophy.png'}
                width={45}
                height={65}
                alt="map"
                className='h-full w-full'
                />
          
            <div className=''>
                <p className='text-sm'>Leaderboard</p>
                <p>80/100</p>
            </div>
      </div>

      <div className='flex flex-row space-x-1'>
          
                <Image
                src={'/assets/png/coin.png'}
                width={45}
                height={50}
                alt="map"
               
              />
          
            <div className=''>
                <p className='text-sm'>Gold</p>
                <p>100</p>
            </div>
      </div>

      <div className='flex flex-row space-x-1'>
          
                <Image
                src={'/assets/png/level.png'}
                width={45}
                height={45}
                alt="map"
                
              />
          
            <div className=''>
                <p className='text-sm'>Level</p>
                <p>3</p>
            </div>
      </div>       
  </div>

  <div className='flex flex-row text-center text-white justify-between items-center w-full px-3 mt-3'>
      <div className='flex justify-end h-full flex-col'>
      <p className="font-bold text-sm">Contact details:</p>
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
      </div>
      {/* qr code div*/}
      <div>
              <div className=''><QRCodeSVG
                value={idToPid(user?.id!)}
                size={110}
                bgColor="transparent"
                color="#ffffff"
        fgColor="#ffffff"
              /></div>
               <a className={`titleFont text-[#fff] text-lg  mt-5`}>
                {idToPid(user?.id!)}
              </a>
        </div>
  </div>
</div>
    </section>
  );
};

export default ProfileInfo;
