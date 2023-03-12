import { titleFont } from '@/src/utils/fonts';
import { FC, useEffect, useState } from 'react';

const CountDown: FC = () => {
  const endDate = new Date('2023-03-30'); // TODO: Change this to the actual date

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

  return (
    <div className={`text-white text-center ${titleFont.className}`}>
      <h1 className="text-xl lg:text-3xl">The wait is almost over!</h1>
      <div className="flex justify-center items-start sm:items-center flex-col lg:flex-row gap-5 lg:gap-10 mt-4 drop-shadow-xl">
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
    </div>
  );
};

export default CountDown;
