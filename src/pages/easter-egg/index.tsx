import Button from "@/src/components/button";
import ImageUpload from "@/src/components/easter-egg/imageUpload";
import { NextPage } from "next";
import { useState } from "react";

type Props = {};

const EasterEgg: NextPage = (props: Props) => {
  const [clue1, setClue1] = useState<File | null>(null);
  const [clue2, setClue2] = useState<File | null>(null);
  const [clue3, setClue3] = useState<File | null>(null);
  const [clue4, setClue4] = useState<File | null>(null);

  return (
    <div className="bg-gradient-to-b  from-[#41acc9]  via-[#075985] to-[#2d6aa6] min-h-screen relative">
      <div className="pt-28 pb-12 md:px-12 px-6 flex justify-center items-center flex-col">
        <h2 className="titleFont text-center text-white text-4xl mb-8">
          Upload your easter egg images!
        </h2>
        <div className="max-w-6xl flex flex-wrap gap-8 justify-center text-white/90 ">
          <div className="md:basis-[45%] basis-full bg-black/20  flex flex-col shadow-sm rounded-md">
            <h2 className="mb-3 text-xl titleFont md:px-8 md:pt-6 px-4 pt-4">Clue 1</h2>
            <div className="md:px-8 md:pb-6 flex flex-col grow">
              <ImageUpload setImage={setClue1} />
            </div>
          </div>
          <div className="md:basis-[45%] basis-full bg-black/20  flex flex-col shadow-sm rounded-md">
            <h2 className="mb-3 text-xl titleFont md:px-8 md:pt-6 px-4 pt-4">Clue 2</h2>
            <div className="md:px-8 md:pb-6 flex flex-col grow">
              <ImageUpload setImage={setClue2} />
            </div>
          </div>
          <div className="md:basis-[45%] basis-full bg-black/20  flex flex-col shadow-sm rounded-md">
            <h2 className="mb-3 text-xl titleFont md:px-8 md:pt-6 px-4 pt-4">Clue 3</h2>
            <div className="md:px-8 md:pb-6 flex flex-col grow">
              <ImageUpload setImage={setClue3} />
            </div>
          </div>
          <div className="md:basis-[45%] basis-full bg-black/20  flex flex-col shadow-sm rounded-md">
            <h2 className="mb-3 text-xl titleFont md:px-8 md:pt-6 px-4 pt-4">Clue 4</h2>
            <div className="md:px-8 md:pb-6 flex flex-col grow">
              <ImageUpload setImage={setClue4} />
            </div>
          </div>
        </div>
				<Button className="mt-10">Submit</Button>
      </div>
    </div>
  );
};

export default EasterEgg;
