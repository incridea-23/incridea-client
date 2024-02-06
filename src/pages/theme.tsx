import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import Loader from "../components/Loader";
import { baseImageUrl } from "../utils/url";

function Theme() {
  // redirect to youtube
  const router = useRouter();
  useEffect(() => {
    router.push("https://youtu.be/GdmrDe-VIlo?feature=shared");
  }, [router]);

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <Image
        src={`${baseImageUrl}/assets/png/logo.png`}
        className="animate-pulse"
        alt="logo"
        width={300}
        height={300}
      />
    </div>
  );
}

export default Theme;
