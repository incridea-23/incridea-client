import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { baseImageUrl } from "@/src/utils/url";
export default function ArcadeLoader() {
  const landingContainer = useRef(null);
  useGSAP(
    () => {
      gsap.to(landingContainer.current, {
        scale: 13,
        translateY: 550,
        translateX: 200,
        duration: 2,
        delay: 0.5,
        ease: "power2.in",
        onComplete() {
          gsap.to(landingContainer.current, { opacity: 0, duration: 1 });
          setTimeout(() => {
            // setPageLoader(false);
            if (landingContainer.current) {
              (landingContainer.current as HTMLElement).style.pointerEvents =
                "none";
            }
            sessionStorage.setItem("arcadeLoader", "false");
          }, 1000);
        },
      });
    },
    { scope: landingContainer }
  );

  return (
    <section
      ref={landingContainer}
      className=" min-h-screen w-full flex justify-center items-center  z-[999] absolute top-0 left-0"
    >
      <Image
        src={`/assets/landing/landing@2x.png`}
        alt="UI Incridea 2024"
        width={1920}
        height={1080}
        priority
        className="image w-full h-full object-cover object-center absolute top-0 left-0"
      />
      <div className="aspect-video w-full relative h-screen min-w-max ">
        <div className="absolute left-1/2 -translate-x-[60%] top-[39%] h-[12%] w-[8%]  ">
          <Image
            height={482}
            width={256}
            className="w-full h-full rounded-lg"
            src={`${baseImageUrl}/assets/gif/nosignal.gif`}
            alt="no signal"
            priority
          />
        </div>
      </div>
      {/* <div className="absolute  translate-y-[18%]">
            <Arcade />
          </div> */}
    </section>
  );
}
