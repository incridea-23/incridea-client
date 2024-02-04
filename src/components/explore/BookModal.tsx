import Sponsors from "@/src/pages/sponsors";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import HTMLFlipBook from "react-pageflip";
import useStore from "../store/store";
import styles from "./bookModal.module.css";
interface BookModalType {
  isMuted: boolean;
  mainThemeAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const BookModal: React.FC<BookModalType> = ({ isMuted, mainThemeAudioRef }) => {
  const sponsors = [
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios",
      title: "Sponsor Sponsor Sponsor",
    },
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios 2",
      title: "Sponsor Sponsor Sponsor",
    },
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios 3",
      title: "Sponsor Sponsor Sponsor",
    },
    {
      logo: "/assets/png/ryoko.png",
      name: "Paramvah Studios 4",
      title: "Sponsor Sponsor Sponsor",
    },
  ];

  const setSponsorFlag = useStore((state) => state.setSponsor);
  const sponsorFlag = useStore((state) => state.sponsor);

  useEffect(() => {
    const audio = new Audio("/audio/level2/pirates.mp3");
    audio.volume = 0.3;
    let mainRef = mainThemeAudioRef;
    if (isMuted) {
      return;
    } else if (!isMuted && sponsorFlag) {
      mainRef?.current?.pause();
      audio.play();
    }
    return () => {
      audio.pause();
      mainRef?.current?.play();
    };
  }, [sponsorFlag, isMuted, mainThemeAudioRef]);

  return (
    <>
      <div className="flex fixed inset-0 z-[1000] h-screen items-center justify-center p-5 md:scale-[200%]  overflow-hidden bg-black bg-opacity-50">
        <HTMLFlipBook
          width={150}
          height={225}
          className=" "
          style={{}}
          startPage={0}
          size={"fixed"}
          minWidth={150}
          maxWidth={400}
          minHeight={225}
          maxHeight={600}
          drawShadow={true}
          flippingTime={500}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.1}
          showCover={false}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={2}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          <div className="">
            <Image
              src="/assets/png/bookCoverTexture.jpg"
              alt="cover"
              width={100}
              height={100}
              className="h-full w-full"
            />
          </div>
          {sponsors.map((page, index) => {
            return (
              <div
                className="bg-[url('/assets/png/pageTexture.jpg')] bg-center bg-cover flex flex-col justify-center items-center w-full"
                key={index}
              >
                {/* <Image
                  src={page.logo}
                  alt={page.name}
                  width={300}
                  height={300}
                  className="h-64 w-64 rounded-lg "
                />
                <p className="text-xl text-amber-900 font-semibold text-center">
                  {page.title}
                </p>
                <p className="text-3xl text-white font-semibold text-center">
                  {page.name}
                </p> */}
              </div>
            );
          })}
          <div className="">
            <Image
              src="/assets/png/bookCoverTexture.jpg"
              alt="cover"
              width={100}
              height={100}
              className="h-full w-full"
            />
          </div>
        </HTMLFlipBook>
      </div>
      <div
        className="fixed lg:top-[15%]  xl:right-[30%] lg:right-[25%] md:right-[20%] sm:right-[15%] top-[25%] right-[10%] z-[1001]  cursor-pointer bg-primary-300 px-2 py-1 rounded-sm"
        style={{ pointerEvents: sponsorFlag ? "all" : "none" }}
        onClick={setSponsorFlag}
      >
        <IoMdClose className="text-lg text-white" />
      </div>
    </>
  );
  // const pageRef = useRef<HTMLDivElement[]>([]);

  // const setSponsorFlag = useStore((state) => state.setSponsor);
  // const sponsorFlag = useStore((state) => state.sponsor);

  // useEffect(() => {
  //   gsap.set(`.${styles.pageBg}`, { xPercent: -50, yPercent: -50 });
  //   gsap.set(`.${styles.pageWrapper}`, { left: "50%", perspective: 1000 });
  //   gsap.set(`.${styles.page}`, { transformStyle: "preserve-3d" });
  //   gsap.set(`.${styles.back}`, { rotationY: -180 });
  //   gsap.set([`.${styles.back}`, `.${styles.front}`], {
  //     backfaceVisibility: "hidden",
  //   });

  //   const pageLocation: { [id: string]: string } = {};

  //   pageRef.current.forEach((page) => {
  //     const id = page.id;

  //     page.addEventListener("click", () => {
  //       if (pageLocation[id] === undefined || pageLocation[id] === "right") {
  //         const zi = document.querySelectorAll(`.${styles.left}`).length + 1;
  //         gsap.set(page, { className: `${styles.page} ${styles.left}` });
  //         gsap.to(page, {
  //           duration: 1,
  //           force3D: true,
  //           rotationY: -180,
  //           transformOrigin: "-1px top",
  //           z: zi,
  //           zIndex: zi,
  //         });
  //         pageLocation[id] = "left";
  //       } else {
  //         const zi = document.querySelectorAll(`.${styles.right}`).length + 1;
  //         gsap.to(page, {
  //           duration: 1,
  //           force3D: true,
  //           rotationY: 0,
  //           transformOrigin: "left top",
  //           z: zi,
  //           zIndex: zi,
  //         });
  //         gsap.set(page, { className: `${styles.page} ${styles.right}` });
  //         pageLocation[id] = "right";
  //       }
  //     });
  //   });

  //   const frontPages = document.querySelectorAll(`.${styles.front}`);
  //   frontPages.forEach((frontPage) => {
  //     const pageFoldRight = frontPage.querySelector(`.${styles.pageFoldRight}`);
  //     frontPage.addEventListener("mouseenter", () => {
  //       gsap.to(pageFoldRight, {
  //         duration: 0.3,
  //         width: "50px",
  //         height: "50px",
  //         backgroundImage:
  //           "linear-gradient(45deg, #fefefe 0%, #f2f2f2 49%, #ffffff 50%, #ffffff 100%)",
  //       });
  //     });
  //     frontPage.addEventListener("mouseleave", () => {
  //       gsap.to(pageFoldRight, {
  //         duration: 0.3,
  //         width: "0px",
  //         height: "0px",
  //       });
  //     });
  //   });

  //   const backPages = document.querySelectorAll(`.${styles.back}`);
  //   backPages.forEach((backPage) => {
  //     const pageFoldLeft = backPage.querySelector(`.${styles.pageFoldLeft}`);
  //     backPage.addEventListener("mouseenter", () => {
  //       gsap.to(pageFoldLeft, {
  //         duration: 0.3,
  //         width: "50px",
  //         height: "50px",
  //         backgroundImage:
  //           "linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #f2f2f2 51%, #fefefe 100%)",
  //       });
  //     });
  //     backPage.addEventListener("mouseleave", () => {
  //       gsap.to(pageFoldLeft, {
  //         duration: 0.3,
  //         width: "0px",
  //         height: "0px",
  //       });
  //     });
  //   });
  // }, []);

  // return (
  //   <div className="flex fixed inset-0 z-[1000] h-screen items-center justify-center p-5  overflow-hidden">
  // <div
  //   className="absolute top-5 right-5 cursor-pointer bg-red-600 px-2 py-1 rounded-sm"
  //   style={{ pointerEvents: sponsorFlag ? "all" : "none" }}
  //   onClick={setSponsorFlag}
  // >
  //   <IoMdClose className="text-lg text-white" />
  // </div>
  //     <div className="h-1/3 sm:h-3/4 lg:h-5/6  max-w-2xl lg:max-w-3xl w-full">
  //       <div className={styles.bookBg}>
  //         <div className={styles.pageBg}>
  //           <div className={styles.pageWrapper}>
  //             <div
  //               ref={(el) => (pageRef.current[2] = el as HTMLDivElement)}
  //               id="page3"
  //               className={styles.page}
  //             >
  //               <div className={`${styles.pageFace} ${styles.front}`}>
  //                 <h1>right 3</h1>
  //                 <div className={styles.pageFoldRight}></div>
  //               </div>
  //               <div className={`${styles.pageFace} ${styles.back}`}>
  //                 <h1>left 3</h1>
  //                 <div className={styles.pageFoldLeft}></div>
  //               </div>
  //             </div>
  //             <div
  //               ref={(el) => (pageRef.current[1] = el as HTMLDivElement)}
  //               id="page2"
  //               className={styles.page}
  //             >
  //               <div className={`${styles.pageFace} ${styles.front}`}>
  //                 <h1>right 2</h1>
  //                 <div className={styles.pageFoldRight}></div>
  //               </div>
  //               <div className={`${styles.pageFace} ${styles.back}`}>
  //                 <h1>left 2</h1>
  //                 <div className={styles.pageFoldLeft}></div>
  //               </div>
  //             </div>
  //             <div
  //               ref={(el) => (pageRef.current[0] = el as HTMLDivElement)}
  //               id="page1"
  //               className={styles.page}
  //             >
  //               <div className={`${styles.pageFace} ${styles.front}`}>
  //                 <h1>right 1</h1>
  //                 <div className={styles.pageFoldRight}></div>
  //               </div>
  //               <div className={`${styles.pageFace} ${styles.back}`}>
  //                 <h1>left 1</h1>
  //                 <div className={styles.pageFoldLeft}></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default BookModal;
