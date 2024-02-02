import { NextPage } from "next";
import Image from "next/image";
import Button from "../components/button";
import Link from "next/link";

const Page404: NextPage = () => {
  const titleText: string = "Game Over!";
  const bodyText: string =
    "Looks like you've taken a wrong turn.";

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-b from-primary-300 to-primary-500">
      <div className="text-9xl font-black text-white/30">404</div>
      <div className="flex flex-col justify-center items-center">
        <h1
          className={`font-bold text-2xl md:text-5xl mb-1 md:mb-3 text-white transition-colors duration-300 flex justify-center items-center text-center mx-2`}
        >
          {titleText}
        </h1>
        <h1
          className={`text-sm md:text-lg text-gray-200 transition-colors duration-300 flex justify-center items-center text-center mx-2`}
        >
          {bodyText}{" "}
        </h1>
        <Link href={"/"} as="/">
          <Button className="mt-4" intent={"primary"}>
            Return to Main Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
