import Reveal from "./reveal";
import ScrollLag from "./scrollLag";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type BannerProps = {
  video?: string;
  photo?: string;
  text: string;
  credits?: string;
};

const Banner: React.FC<BannerProps> = ({ photo, text, video, credits }) => {
  return (
    <div className="relative h-80 w-full overflow-hidden shrink-0">
      {photo && (
        <div className="absolute inset-0">
          <Image
            src={photo}
            alt="Banner"
            fill
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            priority
          />
        </div>
      )}
      {video && (
        <div className="absolute w-full h-full md:h-screen lg:h-screen xl:h-screen md:min-h-[396px] md:max-h-[525px] lg:min-h-[620px] lg:max-h-[640px] xl:min-h-[720px] xl:max-h-[780px] 2xl:h-[800px] flex justify-stretch">
          <ReactPlayer
            url={video}
            playing
            loop
            muted
            controls={false}
            width="100%"
            height="100%"
          />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <ScrollLag classes="mb-10 lg:mb-44" speed={200}>
          <Reveal classes="">
            <div className={`text-center text-4xl font-black lg:text-7xl`}>
              {text}
            </div>
          </Reveal>
        </ScrollLag>
      </div>
    </div>
  );
};

export default Banner;
