import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
// import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import dynamic from "next/dynamic";
import { ScrollControls } from "@react-three/drei";
import { Scene1 } from "@/src/components/scene/scene1";
import scene1 from "../../../public/assets/3d/state.json";
// const Scene1 = dynamic(() => import("@/src/components/scene/scene1"), {
//   ssr: false,
// });
// import { OrbitControls, ScrollControls } from "@react-three/drei";
// import demoProjectState from './state.json'

// studio.extend(extension);
// studio.initialize();

const demoSheet = getProject("Scene 1", { state: scene1 }).sheet("Scene 1");
const App = () => {
  // useEffect(() => {
  //   demoSheet.project.ready.then(() =>
  //     demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
  //   );
  // }, []);

  return (
    <div className="w-full h-screen">
      <Suspense>
        <Canvas
          gl={{
            preserveDrawingBuffer: true,
          }}
        >
          <color attach={"background"} args={["#87CEEB"]} />
          <ScrollControls pages={6}>
            <SheetProvider sheet={demoSheet}>
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
                <Scene1 />
              </>
            </SheetProvider>
          </ScrollControls>
        </Canvas>
      </Suspense>
      {/* <div className="h-500vh -z-100"></div> */}
    </div>
  );
};

export default App;
