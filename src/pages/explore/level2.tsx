import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
// import studio from "@theatre/studio";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
// import dynamic from "next/dynamic";
import { ScrollControls } from "@react-three/drei";
import BookModal from "@/src/components/explore/BookModal";
import ExploreNav from "@/src/components/explore/exploreNav";
import Pokedex from "@/src/components/pokedex";
import useStore from "@/src/components/store/store";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import { useQuery } from "@apollo/client";
import studio from "@theatre/studio";
import dynamic from "next/dynamic";
import scene1 from "../../../public/assets/3d/state4.json";
import AudioPlayer from "@/src/components/explore/AudioPlayer";
import { baseAudioUrl } from "@/src/utils/url";

const Scene1 = dynamic(() => import("@/src/components/scene1"), {
  ssr: false,
});
// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";

// studio.extend(extension);
// studio.initialize();

const demoSheet = getProject("Scene 1", { state: scene1 }).sheet("Scene 1");
const App = () => {
  const [instruction, setInstruction] = useState<boolean>(true);
  const {
    data: eventsData,
    loading: eventLoading,
    error: eventError,
  } = useQuery<PublishedEventsQuery>(PublishedEventsDocument);

  let tempFilteredEvents = eventsData?.publishedEvents;

  tempFilteredEvents = tempFilteredEvents?.filter(
    (event) => event.category === "CORE"
  );

  const events: Array<{ id: string; name: string; image: string }> =
    tempFilteredEvents?.map((event) => ({
      id: event.id,
      name: event.name || "",
      image: event.image || "",
    })) || [];

  const modalRef = useRef(null);
  const sponsorBookRef = useRef(null);
  const eventDex = useStore((state) => state.eventDex);
  const sponsor = useStore((state) => state.sponsor);

  const [isMuted, setIsMuted] = useState(true);
  const mainThemeAudioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="w-full h-screen">
      <AudioPlayer
        mainThemeAudioRef={mainThemeAudioRef}
        mainTheme={`${baseAudioUrl}/audio/level2/main.mp3`}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      ></AudioPlayer>
      <ExploreNav />
      <Suspense>
        <Canvas
          gl={{
            preserveDrawingBuffer: true,
          }}
          className="z-50"
        >
          <SheetProvider sheet={demoSheet}>
            <color attach={"background"} args={["#87CEEB"]} />
            <ScrollControls pages={6} maxSpeed={0.5}>
              <>
                <e.group theatreKey="cameraContainer" position={[0, 10, 0]}>
                  <PerspectiveCamera
                    theatreKey="Camera"
                    makeDefault
                    position={[0, 0, 0]}
                    rotation={[0.3, Math.PI, 0]}
                    fov={50}
                    near={0.1}
                    far={100}
                  />
                </e.group>
                <ambientLight intensity={0.5} />
                <fog attach={"fog"} args={["#87CEEB", 0.1, 100]} />
                <directionalLight
                  color={"#fff490"}
                  position={[0, 100, -100]}
                  intensity={0.5}
                />
                <Scene1 setInstruction={setInstruction} />
              </>
            </ScrollControls>
          </SheetProvider>
        </Canvas>
      </Suspense>
      <div className="" ref={modalRef}>
        {eventDex && (
          <Pokedex
            isMuted={isMuted}
            mainThemeAudioRef={mainThemeAudioRef}
            data={events}
          />
        )}
      </div>
      <div className="" ref={sponsorBookRef}>
        {sponsor && (
          <BookModal isMuted={isMuted} mainThemeAudioRef={mainThemeAudioRef} />
        )}
      </div>
      {instruction && (
        <div className="absolute z-[100] text-white transition-all pointer-events-none duration-300 bottom-20 left-1/2 -translate-x-1/2 text-base md:text-lg 2xl:text-xl animate-pulse font-semibold">
          Scroll down to explore
        </div>
      )}
    </div>
  );
};

export default App;
