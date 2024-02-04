import Image from "next/image";
import { IoMdMicrophone } from "react-icons/io";

type ProniteCardProps = {
  artist: {
    name: string;
    time: string;
    imageSrc: string;
  };
  isArtist: boolean;
};

export default function ProniteCard({ artist, isArtist }: ProniteCardProps) {
  return (
    <>
      <div
        style={{
          opacity: isArtist ? 1 : 0,
          transition: "opacity 0.5s",
        }}
        className="absolute text-white bottom-6 right-6 md:bottom-10 md:right-10 z-50 pointer-events-none rounded-[14px] "
      >
        <Image
          src={artist.imageSrc}
          alt={artist.name}
          fill={true}
          className="object-cover -z-50 rounded-[14px]"
        />
        <div className="absolute bg-gradient-to-tr from-[#bc43a2] to-[#e18472] h-full w-full opacity-70 -z-50 rounded-[14px]"></div>
        <div className="p-2 md:p-3 z-50">
          <div className="h-16 md:h-20 flex items-center opacity-90">
            <IoMdMicrophone className="ml-2" size={"3rem"} />
          </div>
          <div className="flex flex-col p-2">
            <div className="font-medium text-xl md:text-2xl">{artist.name}</div>
            <div className="opacity-70">{artist.time}</div>
          </div>
        </div>
      </div>
    </>
  );
}
