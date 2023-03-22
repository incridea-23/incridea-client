import { titleFont } from "@/src/utils/fonts";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import TextAnimation from "../animation/text";

const CountDown: FC = () => {
  const endDate = new Date("2023-04-26");

  const calculateCountdown = () => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [rotation, setRotation] = useState("rotate-0");

  useEffect(() => {
    const rot = `${-(countdown.seconds * 6) % 360}deg`;
    setRotation(rot);
  }, [countdown.seconds]);

  return (
    <section className={`text-white text-center ${titleFont.className} mb-72`}>
      <TextAnimation
        text="The wait is almost over!"
        className="flex justify-center"
        textStyle="text-xl font-semibold lg:text-3xl"
      />
      <div className="flex justify-center items-start sm:items-center flex-col lg:flex-row gap-5 lg:gap-10 mt-4 drop-shadow-xl relative">
        <Image
          src={"/assets/png/helm.png"}
          width={500}
          height={500}
          alt="Ship Helm"
          className="absolute opacity-[8%]"
          style={{ transform: `rotate(${rotation})` }}
        />
        <div className="flex items-end">
          <a className="text-4xl lg:text-7xl font-extrabold w-[100px]">
            {countdown.days}
          </a>
          <span className="ml-2 text-xl">Days</span>
        </div>

        <div className="flex items-end">
          <a className="text-4xl lg:text-7xl font-extrabold w-[100px]">
            {countdown.hours}
          </a>
          <span className="ml-2 text-xl">Hours</span>
        </div>

        <div className="flex items-end">
          <a className="text-4xl lg:text-7xl font-extrabold w-[100px]">
            {countdown.minutes}
          </a>
          <span className="ml-2 text-xl">Minutes</span>
        </div>

        <div className="flex items-end">
          <a className="text-4xl lg:text-7xl font-extrabold w-[100px]">
            {countdown.seconds}
          </a>
          <span className="ml-2 text-xl">Seconds</span>
        </div>
      </div>
    </section>
  );
};

export default CountDown;
