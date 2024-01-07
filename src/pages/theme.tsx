import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

function Theme() {
  const config = {
    angle: 290,
    spread: 360,
    startVelocity: 40,
    elementCount: 150,
    dragFriction: 0.11,
    duration: 5020,
    stagger: 3,
    width: "8px",
    height: "14px",
    perspective: "503px",
    colors: [
      "#f00",
      "#0f0",
      "#00f",
      "#FFC700",
      "#FF0000",
      "#2E3191",
      "#41BBC7",
    ],
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    ConfettiExplosion();
  }, [setShow]);
  const ConfettiExplosion = () => {
    setShow(true);
    setTimeout(() => setShow(false), 4000);
  };
  return (
    <div className="h-screen w-screen bg-white p-5 overflow-hidden  justify-center items-center flex flex-col relative">
      <div className="absolute top-0 left-0 z-20">
        <Confetti active={show} config={config} />
      </div>
      <Image
        src={"/assets/gif/rick-roll.gif"}
        alt="loader"
        width={500}
        height={500}
        priority
        className="absolute top-0 left-0 h-screen w-screen object-cover object-center "
      />
      <div className="z-10 text-center space-y-5">
        <h1
          className=" text-7xl text-center font-bold  "
          style={{
            WebkitTextStroke: "1px #FFF",
          }}>
          Incridea Theme
        </h1>
        <p
          className="text-black text-2xl font-semibold "
          style={{
            WebkitTextStroke: "0.5px #FFF",
          }}>
          Checkout our{" "}
          <a
            style={{
              WebkitTextStroke: "0.5px #FFF",
            }}
            href="https://www.instagram.com/incridea/"
            className="italic underline">
            instagram
          </a>{" "}
          for more updates
        </p>
      </div>
    </div>
  );
}

export default Theme;
