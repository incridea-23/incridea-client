// React component
import styles from "@/src/components/galleryslide/styles/gallery.module.css";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  year: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ year }) => {
  const totalYears = 5;
  const filledSteps = Math.min(year + 1, totalYears);
  const [loadedSteps, setLoadedSteps] = useState(0);
  const characterRef = useRef<HTMLImageElement | null>(null);
  const powerUpImages = ["level", "coin", "witchHat", "sword", "dice"];

  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles["progress-step"]}`);
    const character = characterRef.current;

    const tl = gsap.timeline();

    elements.forEach((element, index) => {
      if (index < filledSteps) {
        element.classList.add(styles.filled);
      }

      if (index === filledSteps - 1 && index < loadedSteps) {
        tl.fromTo(
          element,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "sine.inOut" },
          0 
        );

        const elementRect = element.getBoundingClientRect();
        const characterRect = character?.getBoundingClientRect();
        if (index !== 0) {
          tl.to(
            character,
            {
              x: (elementRect.width * 2 + 20) * index,
              duration: 0.5,
              ease: "sine.inOut",
            },
            0
          );
        } else {
          tl.to(
            character,
            {
              x: 0,
              duration: 0.5,
              ease: "sine.inOut",
            },
            0
          );
        }
      } else {
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
              src={`/assets/png/${powerUpImages[index]}.png`}
              alt={`Step ${index + 1}`}
              width={200}
              height={200}
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
        className={styles["character"]}
        ref={characterRef}
      />
    </div>
  );
};

export default ProgressBar;
