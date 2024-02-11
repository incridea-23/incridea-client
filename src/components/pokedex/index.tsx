import Button from "@/src/components/button";
import Carousel from "@/src/components/slider";
import { AddXpDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import useStore from "../store/store";
import { baseAudioUrl, baseImageUrl } from "@/src/utils/url";

interface DexProps {
  data?: Array<{ id: string; name: string; image: string }>;
}

interface DexProps {
  data?: Array<{ id: string; name: string; image: string }>;
  isMuted: boolean;
  mainThemeAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const Pokedex: React.FC<DexProps> = ({
  data = [],
  isMuted,
  mainThemeAudioRef,
}) => {
  const setEventDex = useStore((state) => state.setEventDex);
  // useEffect(() => {
  //   setEventDex();
  // }, []);
  const eventDex = useStore((state) => state.eventDex);
  const [fullyOpen, setFullyOpen] = useState(false);
  const [calledXp, setCalledXp] = useState(false);
  let mutationCalled = false;

  const [addXp] = useMutation(AddXpDocument, {
    variables: {
      levelId: "4",
    },
    refetchQueries: ["GetUserXp"],
    awaitRefetchQueries: true,
  });

  const handleAddXp = () => {
    if (calledXp) {
      return;
    }
    setCalledXp(true);
    const promise = addXp().then((res) => {
      if (res.data?.addXP.__typename === "MutationAddXPSuccess") {
        toast.success(
          `Congratulations!!! You have found ${res.data?.addXP.data.level.point} Xp`,
          {
            position: "bottom-center",
            style: {
              backgroundColor: "#7628D0",
              color: "white",
            },
          }
        );
      }
    });
  };

  useEffect(() => {
    const audio = new Audio(`${baseAudioUrl}/audio/level2/pokemon.mp3`);
    audio.volume = 0.3;
    let mainRef = mainThemeAudioRef;
    if (isMuted) {
      return;
    } else if (!isMuted && eventDex) {
      mainRef?.current?.pause();
      audio.play();
    }
    return () => {
      audio.pause();
      mainRef?.current?.play();
    };
  }, [eventDex, isMuted, mainThemeAudioRef]);

  useEffect(() => {
    // Initialize GSAP
    const tl = gsap.timeline();

    // Initial state (closed)
    tl.call(() => {
      setFullyOpen(false);
    })
      .set(".animate-1", { y: 100 })
      .set(".animate-3", { y: -80 })
      .set(".carousel-container", { opacity: 0 });

    // Opening animation
    tl.to(".animate-1", { y: -20, duration: 2, delay: 1 })
      .to(".animate-3", { y: 40, duration: 2 }, "<")
      .to(".carousel-container", { opacity: 1, duration: 3 }, "<")
      .call(() => {
        console.log("Fully open");
        setFullyOpen(true);
        if (!mutationCalled) {
          mutationCalled = true;
          handleAddXp();
        }
      });
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50">
      <div className="page-container h-screen relative">
        {/* Pokedex background */}

        <div className="h-full w-full flex flex-col top-[5%] items-center relative animation-container z-0">
          {/* Top part of Pokedex */}
          <div className="flex justify-end">
            {fullyOpen ? (
              <div
                className="cursor-pointer absolute w-fit bg-[#3d0a10] px-4 py-4 rounded-bl-full rounded-tr-lg  z-50"
                style={{ pointerEvents: eventDex ? "all" : "none" }}
                onClick={setEventDex}
              >
                <IoMdClose className="text-lg text-white" />
              </div>
            ) : null}

            <Image
              src={`${baseImageUrl}/assets/svg/dextop.svg`}
              alt="dexmid"
              width={2491}
              height={1082}
              className="md:w-80 aspect-[2491/1082] top-5 animate-1 relative z-[1]"
            />
          </div>

          {/* Carousel at the center */}
          <div className="flex flex-col overflow-x-clip lg:overflow-x-visible justify-center items-center relative z-0 w-full">
            {/* Carousel */}
            <div className="md:w-80 w-full relative z-10 bg-[#B5FFF7] flex flex-col justify-center p-[10px]">
              {/* Your carousel content goes here */}
              <div className="w-full h-full relative bg-blue-500 rounded-xl flex flex-col items-center carousel-container py-2">
                <Carousel events={data} />
                {/* Dex button inside the carousel container */}
                <Link
                  href={"/events"}
                  className="flex butanim w-full justify-center relative z-20 px-2 -bottom-1 mb-2"
                  target="_blank"
                >
                  <Button className="font-VikingHell h-full">
                    View Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom part of Pokedex */}
          <div>
            <Image
              src={`${baseImageUrl}/assets/svg/dexbot.svg`}
              alt="dexmid"
              width={2491}
              height={1082}
              className="md:w-80 aspect-[2491/1022] bottom-10 animate-3 relative z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
