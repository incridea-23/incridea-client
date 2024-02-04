import { FooterBody } from "@/src/components/footer";
import GallerySlide from "@/src/components/galleryslide";
import ProgressBar from "@/src/components/galleryslide/progressBar/progress-bar";
import styles from "@/src/components/galleryslide/styles/shadow.module.css";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Autoplay, Navigation, Pagination, Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Gallery: NextPage = () => {
  const [activeYear, setActiveYear] = useState<number>(0);
  const swiperRef = useRef<SwiperType>();
  const years = [2019, 2020, 2022, 2023, 2024];
  const imageCounts = [25, 2, 18, 20, 0];

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
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  useEffect(() => {
    if (typeof window !== "undefined") {
      toast.success(
        "Feel free to interact with the console, Swipe the screens etc to interact!",
        {
          duration: 3000,
          style: {
            color: "black",
          },
        }
      );
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#animation", {
        delay: 0.3,
        filter: "drop-shadow(0px 0px 0px white)",
        y: -90,
        // boxShadow: "0px 10px 67px 40px rgba(0,0,0,0.25)",
      }).to("#animation", {
        y: 0,
        filter: "drop-shadow(0px 0px 2vw white)",
        // boxShadow: "0px 10px 67px 90px rgba(0,0,0,0.25)",
        duration: 0.5,
      });
    });
    window?.addEventListener("deviceorientation", (evt) => {
      let xAng = evt.gamma;
      xAng ? x.set(xAng / 100) : null;
      let yAng = evt.beta;
      yAng ? y.set(yAng / 100) : null;
    });
  }, [activeYear, x, y]);
  const img2019: string[] = generateImagePaths(years[0], imageCounts[0], "jpg");
  const img2020: string[] = generateImagePaths(years[1], imageCounts[1], "jpg");
  const img2022: string[] = generateImagePaths(years[2], imageCounts[2], "jpg");
  const img2023: string[] = generateImagePaths(years[3], imageCounts[3], "jpg");

  //Not needed but refactoring not worth it
  const img2024: string[] = generateImagePaths(years[4], imageCounts[4], "jpg");

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(
    mouseYSpring,
    [-1.8, 1.8],
    ["150deg", "-150deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-1.8, 1.8],
    ["-150deg", "150deg"]
  );
  const tiltStars = (e: any) => {
    const xPct = (e.clientX / window.innerWidth - 0.5) * 0.4;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 0.4;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <>
      <section
        className="flex flex-col w-full h-screen bg-[url('/assets/png/galleryBg.png')] bg-cover bg-center relative overflow-hidden"
        onMouseMove={tiltStars}
      >
        <motion.div
          className={
            "absolute w-full h-full bg-[url('/assets/png/galleryBgStars.png')] bg-cover bg-center"
          }
          id="stars"
          style={{ rotateY, rotateX }}
        ></motion.div>
        {/* Pc Section */}
        <div className="min-h-screen overflow-y-auto z-0">
          {years.map((year, index) => {
            if (index === 4) return;
            return (
              <h1
                key={year}
                id="animation"
                className={
                  styles["text-shadow"] +
                  ` absolute top-28 text-center w-full font-extrabold sm:text-6xl text-4xl z-50 border-black text-white ${
                    activeYear === index ? "block" : "hidden"
                  }`
                }
              >
                INCRIDEA <span className="tracking-tight">{year}</span>
              </h1>
            );
          })}

          {/* Slide Section */}
          <Swiper
            autoplay={false}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            speed={900}
            spaceBetween={200}
            noSwiping={true}
            allowTouchMove={false}
            className="sm:w-full h-full relative flex"
          >
            <SwiperSlide className="flex justify-center items-center text-center">
              <div className="relative w-full h-full flex justify-center items-center">
                <GallerySlide title={"2019"} imgArr={img2019} emulator="gba" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center text-center">
              <div className="relative w-full h-full flex justify-center items-center">
                <GallerySlide
                  title={"2020"}
                  imgArr={img2020}
                  emulator="retroPC"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center text-center">
              <div className="relative w-full h-full flex justify-center items-center">
                <GallerySlide
                  title={"2022"}
                  imgArr={img2022}
                  emulator="retroTV"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center text-center">
              <div className="relative w-full h-full flex justify-center items-center">
                <GallerySlide
                  title={"2023"}
                  imgArr={img2023}
                  emulator="console"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center text-center">
              <div className="relative w-full h-full flex justify-center items-center">
                <GallerySlide
                  title={"2024"}
                  imgArr={img2024}
                  emulator="final"
                />
              </div>
            </SwiperSlide>
            <div className="mx-auto z-20 flex gap-4 absolute sm:bottom-[16%] bottom-32 justify-between px-20 w-full">
              <button
                id="float"
                onClick={async () => {
                  if (activeYear !== 0) {
                    await gsap.to("#animation", {
                      y: -90,
                      // boxShadow: "0px 10px 67px 20px rgba(0,0,0,0.25)",
                      filter: "drop-shadow(0px 0px 0px white)",
                      duration: 0.2,
                    });
                  }

                  setActiveYear((cur) => {
                    if (cur === 0) return cur;
                    return --cur;
                  });
                  return swiperRef.current?.slidePrev();
                }}
                className={`h-6 w-auto duration-75 transition-all ease-in-out z-20`}
              >
                <Image
                  src="/assets/svg/8bitArrow.svg"
                  alt="arrow-previous"
                  width={50}
                  height={50}
                  className="rotate-180 z-20 w-12 h-12 md:w-20 md:h-20"
                  style={{
                    filter:
                      "drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)",
                    WebkitFilter:
                      "drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)",
                  }}
                ></Image>
              </button>
              <button
                id="float"
                onClick={async () => {
                  if (activeYear < years.length) {
                    await gsap.to("#animation", {
                      y: -90,
                      // boxShadow: "0px 10px 67px 20px rgba(0,0,0,0.25)",
                      filter: "drop-shadow(0px 0px 0px white)",
                      duration: 0.2,
                    });
                  }

                  setActiveYear((cur) => {
                    if (cur === years.length) return cur;
                    return ++cur;
                  });
                  return swiperRef.current?.slideNext();
                }}
                className="z-[500] h-6 w-auto duration-75 transition-all ease-in-out"
              >
                <Image
                  src="/assets/svg/8bitArrow.svg"
                  alt="arrow-next"
                  width={50}
                  height={50}
                  //  -webkit-filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
                  className="w-12 z-[500] h-12 md:w-20 md:h-20"
                  style={{
                    filter:
                      "drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)",
                    WebkitFilter:
                      "drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)",
                  }}
                ></Image>
              </button>
            </div>
          </Swiper>
        </div>
      </section>
      <ProgressBar year={activeYear}></ProgressBar>
      <FooterBody />
    </>
  );
};

export default Gallery;
