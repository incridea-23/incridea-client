import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Timer(props: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getRemaingTime() {
    const eventDate = new Date("2024-02-22T09:00:00").getTime();
    const currentDate = new Date().getTime();
    const remainingTime = eventDate - currentDate;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setTime({ days, hours, minutes, seconds });
  }

  useEffect(() => {
    getRemaingTime();
    const interval = setInterval(() => {
      getRemaingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const [size, setSize] = useState<{ height: number; width: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setSize({ height: window.innerHeight, width: window.innerWidth });
      });
    }
  }, []);
  return (
    <Text
      fontSize={Math.min((size.width * 3) / (1920 - 720), 2)}
      font="/font/Inter-Bold.woff"
      letterSpacing={-0.06}
      {...props}
      textAlign="center"
      // color={"#c76f30"}
      fillOpacity={1}
      frustumCulled
    >
      {`${time.days < 10 ? `0${time.days}` : time.days} :${" "}${
        time.hours < 10 ? `0${time.hours}` : time.hours
      } :${" "}${
        time.minutes < 10 ? `0${time.minutes}` : time.minutes
      } :${" "}${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}
    </Text>
  );
}
