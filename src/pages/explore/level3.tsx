import AudioPlayer from "@/src/components/explore/AudioPlayer";
import ExploreNav from "@/src/components/explore/exploreNav";
import Scene2 from "@/src/components/scene2";
import { ScrollControls, useScroll } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function Level3() {
  const mainThemeAudioRef = useRef<HTMLAudioElement>(null);
  const secondAudioRef = useRef<HTMLAudioElement>(null);
  const [muted, setIsMuted] = useState(true);

  return (
    <div className="w-full h-screen overflow-y-scroll">
      <AudioPlayer
        mainThemeAudioRef={mainThemeAudioRef}
        mainTheme="/audio/level3/main.mp3"
        isMuted={muted}
        setIsMuted={setIsMuted}
      />
      <ExploreNav />
      <Canvas>
        <directionalLight
          color={"#ffb647"}
          position={[500, 500, 500]}
          intensity={2}
        />
        <color args={["#333"]} attach={"background"} />
        <ambientLight intensity={0.5} />
        <ScrollControls maxSpeed={0.25} pages={5}>
          <Scene2 isMuted={muted} setIsMuted={setIsMuted} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
