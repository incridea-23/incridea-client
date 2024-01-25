import { FooterBody } from "@/src/components/footer";
import GallerySlide from "@/src/components/galleryslide";
import { motion } from "framer-motion";
import gsap from "gsap";
import { NextPage } from "next";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Gallery: NextPage = () => {
  const [activeYear, setActiveYear] = useState<number>(0);
  const swiperRef = useRef<SwiperType>();
  const years = [2019, 2020, 2022, 2023];
  const imageCounts = [25, 2, 18, 20];

  const generateImagePaths = (
    year: number,
    count: number,
    extension: string
  ) => {
    const imagePaths = [];
    for (let i = 1; i <= count; i++) {
      if (year === years[2] && i > 9) {
        imagePaths.push(`${year}/${i}.JPG`);
      } else {
        imagePaths.push(`${year}/${i}.${extension}`);
      }
    }
    return imagePaths;
  };
  useLayoutEffect(() => {
    // const t2 = gsap.timeline({
    //   repeat: -1,
    //   yoyo: true,
    // });
    // t2.from("#float", {
    //   y: -40,
    //   ease: "sine.in",
    // }).to("#float", {
    //   y: 0,
    //   ease: "sine",
    //   duration: 1,
    // });

    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#animation", {
        delay: 1,
        filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.45))",
        y: -90,
        // boxShadow: "0px 10px 67px 40px rgba(0,0,0,0.25)",
      }).to("#animation", {
        y: 0,
        filter: "drop-shadow(0px 10px 80px rgba(0,0,0,0.75))",
        // boxShadow: "0px 10px 67px 90px rgba(0,0,0,0.25)",
        duration: 1,
      });
    });
  }, [activeYear]);
  const img2019: string[] = generateImagePaths(years[0], imageCounts[0], "jpg");
  const img2020: string[] = generateImagePaths(years[1], imageCounts[1], "jpg");
  const img2022: string[] = generateImagePaths(years[2], imageCounts[2], "jpg");
  const img2023: string[] = generateImagePaths(years[3], imageCounts[3], "jpg");

  return (
    <section className="flex flex-col w-full h-screen bg-purple-400 relative">
      {/* <div className="min-h-screen text-5xl text-gray-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%]">
          <p>Header Section</p>
          <p className="text-3xl mt-2 text-center">Real nice Quotes</p>
        </div>
        <div className="absolute bottom-8 w-3/4 bg-white left-1/2 -translate-x-[50%] h-[2px]"></div>
      </div> */}
      {/* Pc Section */}
      <div className="min-h-screen overflow-y-auto bg-purple-400">
        {/* Slide Section */}
        <div className="text-black text-5xl">{/* Title {Incridea year} */}</div>
        <Swiper
          autoplay={false}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Autoplay]}
          speed={900}
          spaceBetween={100}
          className="sm:w-full h-full border-8 border-[#63aeef] relative flex"
        >
          <SwiperSlide className="flex justify-center items-center text-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <GallerySlide title={"2022"} imgArr={img2019} emulator="gba" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center text-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <GallerySlide
                title={"2022"}
                imgArr={img2019}
                emulator="retroPC"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center text-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <GallerySlide
                title={"2022"}
                imgArr={img2019}
                emulator="retroTV"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center text-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <GallerySlide
                title={"2022"}
                imgArr={img2019}
                emulator="console"
              />
            </div>
          </SwiperSlide>
          <div className="mx-auto flex gap-4 absolute top-[85%] justify-between px-20 w-full">
            <button
              id="float"
              onClick={async () => {
                if (activeYear !== 0) {
                  await gsap.to("#animation", {
                    y: -90,
                    // boxShadow: "0px 10px 67px 20px rgba(0,0,0,0.25)",
                    filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.45))",
                    duration: 1,
                  });
                }

                setActiveYear((cur) => {
                  if (cur === 0) return cur;
                  return --cur;
                });
                return swiperRef.current?.slidePrev();
              }}
              className={`h-6 w-auto z-10 duration-300 transition-all ease-in-out`}
            >
              <Image
                src="/assets/svg/8bitArrow.svg"
                alt="arrow-previous"
                width={50}
                height={50}
                className="drop-shadow-2xl rotate-180"
              ></Image>
            </button>
            <button
              id="float"
              onClick={async () => {
                if (activeYear < years.length - 1) {
                  await gsap.to("#animation", {
                    y: -90,
                    // boxShadow: "0px 10px 67px 20px rgba(0,0,0,0.25)",
                    filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.45))",
                    duration: 1,
                  });
                }

                setActiveYear((cur) => {
                  if (cur === years.length) return cur;
                  return ++cur;
                });
                return swiperRef.current?.slideNext();
              }}
              className="z-10 h-6 w-auto duration-300 transition-all ease-in-out"
            >
              <Image
                src="/assets/svg/8bitArrow.svg"
                alt="arrow-next"
                width={50}
                height={50}
                className=""
              ></Image>
            </button>
          </div>

          {/* <SwiperSlide className="flex justify-center items-center text-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <GallerySlide title={"2022"} imgArr={img2022} emulator="pc" />
            </div>
          </SwiperSlide> */}
        </Swiper>
        {/*
        <GallerySlide
          title={"2022"}
          next={"2020"}
          prev={"head"}
          imgArr={img2022}
        />

            <GallerySlide
              title={"2022"}
              next={"2020"}
              prev={"head"}
              imgArr={img2022}
            />

            <GallerySlide
              title={"2022"}
              next={"2020"}
              prev={"head"}
              imgArr={img2022}
            /> */}
        <div>{/* Next/Previous Sections Buttons */}</div>
        <div>{/* ProgressBar with Dice */}</div>
      </div>
    </section>
  );

  // return (
  //   <div className="flex flex-col h-screen w-full overflow-x-hidden overflow-y-auto text-gray-100 bg-gradient-to-b from-[#2d6aa6] to-[#052749] snap-y snap-mandatory relative">
  //     {/* Header Part */}
  //     <div
  //       id="head"
  //       className="snap-start min-h-screen w-full relative flex overflow-hidden /60"
  //     >
  //       <video
  //         autoPlay
  //         loop
  //         muted
  //         className="object-cover object-center w-full h-full opacity-50 scale-[1.1]"
  //       >
  //         <source src="https://res.cloudinary.com/drzra1b9g/video/upload/v1681721288/gallery.mp4" type="video/mp4"></source>
  //       </video>
  //       <motion.div
  //         animate={{ y: [20, 0], opacity: [0, 1], repeatCount: 1 }}
  //         transition={{ duration: 3 }}
  //         className={`titleFont absolute top-1/2 flex w-full justify-center flex-col`}
  //       >
  //         <h1 className="text-4xl sm:text-6xl text-center mb-2">Reflections</h1>
  //         <h2 className="text-2xl sm:text-4xl text-center">
  //           The changing face of the fest
  //         </h2>
  //       </motion.div>
  //       <motion.div
  //         animate={{ y: [30, 0], opacity: [0, 1], repeatCount: 1 }}
  //         transition={{ duration: 3 }}
  //         style={{ x: '-50%' }}
  //         className="h-1 w-40 hidden sm:flex bg-gray-100 absolute bottom-8 left-1/2"
  //       ></motion.div>
  //     </div>

  //     <GallerySlide
  //       title={'2022'}
  //       next={'2020'}
  //       prev={'head'}
  //       imgArr={img2022}
  //     />
  //     <GallerySlide
  //       title={'2020'}
  //       next={'2019'}
  //       prev={'2022'}
  //       imgArr={img2020}
  //     />
  //     <GallerySlide
  //       title={'2019'}
  //       next={'footer'}
  //       prev={'2020'}
  //       imgArr={img2019}
  //     />

  //     <FooterBody />
  //   </div>
  // );
};

export default Gallery;
