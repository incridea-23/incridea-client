import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import Button from "../components/button";
import { IoIosSkipForward } from "react-icons/io";
import { SlVolumeOff, SlVolume2 } from "react-icons/sl";

const Explore = () => {
  const router = useRouter();

  // FIXME: Just a fallback feature if autoplay doesn't work
  const [clickThru, setClickThru] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const blackScreenRef = useRef<HTMLDivElement>(null);
  const YTPlayerRef = useRef<YouTubePlayer>(null);

  return (
    <div className="absolute w-screen h-screen bg-black overflow-hidden">
      <div
        className={`absolute w-screen h-screen z-40 ${
          clickThru ? "pointer-events-none" : "pointer-events-auto"
        }`}
      ></div>
      <button
        onClick={() => {
          if (!YTPlayerRef.current) return;
          if (YTPlayerRef.current.isMuted()) {
            YTPlayerRef.current.unMute();
            setIsMuted(false);
          } else {
            setIsMuted(true);
            YTPlayerRef.current.mute();
          }
        }}
        className="absolute text-white top-[3vh] right-[2vw] z-50 cursor-pointer"
      >
        {isMuted ? (
          <SlVolumeOff className="w-8 h-8 transition-colors duration-150" />
        ) : (
          <SlVolume2 className="w-8 h-8 transition-colors duration-150" />
        )}
      </button>
      <div
        ref={blackScreenRef}
        className="w-screen bg-black h-screen absolute z-40"
      ></div>
      <Button
        onClick={() => {
          router.push("/explore/level1");
        }}
        size={"large"}
        className="absolute -right-1 bottom-[10vh] z-50"
      >
        Skip <IoIosSkipForward />
      </Button>
      <YouTube
        // TODO: VIDEO ID from youtube embed link
        videoId="CN_43nWXebo?si=PGZh5VT92HoLDme_"
        className="relative h-screen w-screen overflow-clip"
        iframeClassName="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[115vw] h-[115vh]"
        style={{}}
        title={"exploreIntro"}
        loading="eager"
        opts={{
          playerVars: {
            autoplay: 1,
            showinfo: 0,
            controls: 0,
            modestbranding: 0,
            disablekb: 1,
            fs: 0,
            loop: 0,
            playsinline: 0,
            rel: 0,
            mute: 1,
          },
        }}
        onReady={(e) => {
          YTPlayerRef.current = e.target;
          e.target.playVideo();
        }}
        onPlay={(e) => {
          console.log(YTPlayerRef.current);
          if (blackScreenRef.current)
            blackScreenRef.current.style.display = "none";
          setClickThru(false);
          e.target.unMute();
        }}
        onPause={(e) => {
          e.target.playVideo();
        }}
        onEnd={(e) => {
          if (blackScreenRef.current)
            blackScreenRef.current.style.display = "initial";
          router.push("/explore/level1");
        }}
        onError={(e) => {
          if (blackScreenRef.current)
            blackScreenRef.current.style.display = "initial";
          router.push("/explore/level1");
        }}
        onStateChange={(e) => {}}
        onPlaybackRateChange={(e) => {}}
        onPlaybackQualityChange={(e) => {}}
      />
    </div>
  );
};

export default Explore;
