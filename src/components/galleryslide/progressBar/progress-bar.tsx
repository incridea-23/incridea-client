// React component
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "src/components/galleryslide/styles/gallery.module.css";

interface ProgressBarProps {
  year: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ year }) => {
  const totalYears = 5;
  const filledSteps = Math.min(year + 1, totalYears);
  const [loadedSteps, setLoadedSteps] = useState(0);
  const characterRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles["progress-step"]}`);
    const character = characterRef.current;

    elements.forEach((element, index) => {
      if (index < filledSteps && index < loadedSteps) {
        const ctx = gsap.context(() => {
          const t1 = gsap.timeline();
          t1.fromTo(
            element,
            { opacity: 0, scale: 0.5, delay: 1 },
            { opacity: 1, scale: 1, duration: 1, ease: "sine.inOut" }
          );

          const elementRect = element.getBoundingClientRect();
          const characterRect = character?.getBoundingClientRect();
          if (index !== 0) {
            t1.to(character, {
              x: (elementRect.width * 2 + 20) * index,
              duration: 1,
              ease: "sine.inOut",
            });
          } else {
            t1.to(character, {
              x: 0,
              duration: 1,
              ease: "sine.inOut",
            });
          }
        });
        element.classList.add(styles.filled);
        return () => ctx.revert();
      } else {
        // const ctx = gsap.context(() => {
        //   const t1 = gsap.timeline();
        //   const elementRect = element.getBoundingClientRect();
        //   if (index !== 0) {
        //     t1.to(character, {
        //       x: (elementRect.width + elementRect.width + 20) * index,
        //       duration: 1,
        //       ease: "sine.inOut",
        //     });
        //   }
        // });
        element.classList.remove(styles.filled);
      }
    });
  }, [filledSteps, loadedSteps, year]);

  return (
    <div className={styles["progress-bar"]}>
      {[...Array(totalYears)].map((_, index) => (
        <div key={index} className={styles["progress-step"]}>
          {index < filledSteps && (
            <Image
              src={`/assets/svg/beach.svg`}
              alt={`Step ${index + 1}`}
              width={50}
              height={50}
              className={styles["svg-art"]}
              onLoad={() => setLoadedSteps((prev) => prev + 1)}
            />
          )}
        </div>
      ))}
      {/* Character SVG */}
      <Image
        src="/assets/svg/character.svg"
        alt="Character"
        width={50}
        height={50}
        className="absolute -left-2"
        ref={characterRef}
      />
    </div>
  );
};

export default ProgressBar;
