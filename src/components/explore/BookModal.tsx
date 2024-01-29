import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./bookModal.module.css";
import useStore from "../store/store";
import { IoMdClose } from "react-icons/io";

const BookModal: React.FC = () => {
  const pageRef = useRef<HTMLDivElement[]>([]);

  const setSponsorFlag = useStore((state) => state.setSponsor);
  const sponsorFlag = useStore((state) => state.sponsor);

  useEffect(() => {
    gsap.set(`.${styles.pageBg}`, { xPercent: -50, yPercent: -50 });
    gsap.set(`.${styles.pageWrapper}`, { left: "50%", perspective: 1000 });
    gsap.set(`.${styles.page}`, { transformStyle: "preserve-3d" });
    gsap.set(`.${styles.back}`, { rotationY: -180 });
    gsap.set([`.${styles.back}`, `.${styles.front}`], {
      backfaceVisibility: "hidden",
    });

    const pageLocation: { [id: string]: string } = {};

    pageRef.current.forEach((page) => {
      const id = page.id;

      page.addEventListener("click", () => {
        if (pageLocation[id] === undefined || pageLocation[id] === "right") {
          const zi = document.querySelectorAll(`.${styles.left}`).length + 1;
          gsap.set(page, { className: `${styles.page} ${styles.left}` });
          gsap.to(page, {
            duration: 1,
            force3D: true,
            rotationY: -180,
            transformOrigin: "-1px top",
            z: zi,
            zIndex: zi,
          });
          pageLocation[id] = "left";
        } else {
          const zi = document.querySelectorAll(`.${styles.right}`).length + 1;
          gsap.to(page, {
            duration: 1,
            force3D: true,
            rotationY: 0,
            transformOrigin: "left top",
            z: zi,
            zIndex: zi,
          });
          gsap.set(page, { className: `${styles.page} ${styles.right}` });
          pageLocation[id] = "right";
        }
      });
    });

    const frontPages = document.querySelectorAll(`.${styles.front}`);
    frontPages.forEach((frontPage) => {
      const pageFoldRight = frontPage.querySelector(`.${styles.pageFoldRight}`);
      frontPage.addEventListener("mouseenter", () => {
        gsap.to(pageFoldRight, {
          duration: 0.3,
          width: "50px",
          height: "50px",
          backgroundImage:
            "linear-gradient(45deg, #fefefe 0%, #f2f2f2 49%, #ffffff 50%, #ffffff 100%)",
        });
      });
      frontPage.addEventListener("mouseleave", () => {
        gsap.to(pageFoldRight, {
          duration: 0.3,
          width: "0px",
          height: "0px",
        });
      });
    });

    const backPages = document.querySelectorAll(`.${styles.back}`);
    backPages.forEach((backPage) => {
      const pageFoldLeft = backPage.querySelector(`.${styles.pageFoldLeft}`);
      backPage.addEventListener("mouseenter", () => {
        gsap.to(pageFoldLeft, {
          duration: 0.3,
          width: "50px",
          height: "50px",
          backgroundImage:
            "linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #f2f2f2 51%, #fefefe 100%)",
        });
      });
      backPage.addEventListener("mouseleave", () => {
        gsap.to(pageFoldLeft, {
          duration: 0.3,
          width: "0px",
          height: "0px",
        });
      });
    });
  }, []);

  return (
    <div className="flex fixed inset-0 z-[1000] h-screen items-center justify-center p-5  overflow-hidden">
      <div
        className="absolute top-5 right-5 cursor-pointer bg-red-600 px-2 py-1 rounded-sm"
        style={{ pointerEvents: sponsorFlag ? "all" : "none" }}
        onClick={setSponsorFlag}
      >
        <IoMdClose className="text-lg text-white" />
      </div>
      <div className="h-1/3 sm:h-3/4 lg:h-5/6  max-w-2xl lg:max-w-3xl w-full">
        <div className={styles.bookBg}>
          <div className={styles.pageBg}>
            <div className={styles.pageWrapper}>
              <div
                ref={(el) => (pageRef.current[2] = el as HTMLDivElement)}
                id="page3"
                className={styles.page}
              >
                <div className={`${styles.pageFace} ${styles.front}`}>
                  <h1>right 3</h1>
                  <div className={styles.pageFoldRight}></div>
                </div>
                <div className={`${styles.pageFace} ${styles.back}`}>
                  <h1>left 3</h1>
                  <div className={styles.pageFoldLeft}></div>
                </div>
              </div>
              <div
                ref={(el) => (pageRef.current[1] = el as HTMLDivElement)}
                id="page2"
                className={styles.page}
              >
                <div className={`${styles.pageFace} ${styles.front}`}>
                  <h1>right 2</h1>
                  <div className={styles.pageFoldRight}></div>
                </div>
                <div className={`${styles.pageFace} ${styles.back}`}>
                  <h1>left 2</h1>
                  <div className={styles.pageFoldLeft}></div>
                </div>
              </div>
              <div
                ref={(el) => (pageRef.current[0] = el as HTMLDivElement)}
                id="page1"
                className={styles.page}
              >
                <div className={`${styles.pageFace} ${styles.front}`}>
                  <h1>right 1</h1>
                  <div className={styles.pageFoldRight}></div>
                </div>
                <div className={`${styles.pageFace} ${styles.back}`}>
                  <h1>left 1</h1>
                  <div className={styles.pageFoldLeft}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
