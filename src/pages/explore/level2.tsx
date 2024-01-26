import { createRoot } from "react-dom/client";
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import dynamic from "next/dynamic";
const Scene1 = dynamic(() => import("@/src/components/scene/scene1"), {
  ssr: false,
});
// import demoProjectState from './state.json'

studio.initialize();
studio.extend(extension);

const demoSheet = getProject("Scene 1").sheet("Scene 1");

const App = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    );
  }, []);

  return (
    <Canvas
      gl={{
        preserveDrawingBuffer: true,
      }}
      className="w-screen h-screen">
      <SheetProvider sheet={demoSheet}>
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          position={[0, 0, 0]}
          fov={45}
        />
        <ambientLight />
        <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
        <Scene1 />
      </SheetProvider>
    </Canvas>
  );
};

export default App;
