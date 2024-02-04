import { useRouter } from "next/router";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const Explore = () => {
  // const ifrmRef = useRef<HTMLIFrameElement | null>(null);
  // useEffect(() => {
  //   var player;
  //   ()=>{t}ion onYouTubeIframeAPIReady() {
  //     player = new YT.Player("player", {
  //       height: "390",
  //       width: "640",
  //       videoId: "M7lc1UVf-VE",
  //       playerVars: {
  //         playsinline: 1,
  //       },
  //       events: {
  //         onReady: onPlayerReady,
  //         onStateChange: onPlayerStateChange,
  //       },
  //     });
  //   }
  //   if (ifrmRef.current) ifrmRef.current.addEventListener("", () => {});
  // });

  const router = useRouter();

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    console.log(event.target.getPlayerState());
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      showinfo: 0,
      controls: 0,
      modestbranding: 0,
      autoplay: 1,
      disablekb: 1,
      fs: 0,
      loop: 0,
      playsinline: 0,
      rel: 0,
    },
  };

  return (
    <YouTube
      videoId="CN_43nWXebo?si=PGZh5VT92HoLDme_"
      id="exploreVideo"
      className="relative h-screen w-screen overflow-clip"
      iframeClassName="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[115%] h-[115%]"
      style={{}}
      title={"exploreVideo"}
      loading="eager"
      opts={opts}
      onReady={onPlayerReady}
      onPlay={() => {}}
      onPause={(event) => {
        // event.target.playVideo();
      }}
      onEnd={() => {
        router.push("/explore/level1");
      }}
      onError={() => {}}
      onStateChange={() => {}}
      onPlaybackRateChange={() => {}}
      onPlaybackQualityChange={() => {
        console.log("quality chenaged??");
      }}
    />
  );

  // return (
  //   <div className="relative w-screen h-screen overflow-clip">
  //     <iframe
  //       ref={ifrmRef}
  //       width="100%"
  //       height="100%"
  //       src="https://www.youtube-nocookie.com/embed/CN_43nWXebo?si=PGZh5VT92HoLDme_&amp;showinfo=0&amp;controls=0&amp;modestbranding=0&amp;autoplay=1&amp;disablekb=1&amp;fs=0&amp;loop=0&amp;playsinline=0&amp;rel=0"
  //       title=""
  //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //       allowFullScreen
  //       className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 "
  //     ></iframe>
  //   </div>
  // );
};

export default Explore;
