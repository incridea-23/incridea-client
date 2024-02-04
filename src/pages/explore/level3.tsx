import Scene2 from "@/src/components/scene2";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// import { getProject } from "@theatre/core";
// import { editable as e, SheetProvider } from "@theatre/r3f";
// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";

// studio.extend(extension);
// studio.initialize();

// const demoSheet = getProject("Scene 1").sheet("Scene 1");

export default function Level3() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        {/* <SheetProvider sheet={demoSheet}> */}
        <directionalLight
          // theatreKey="DirectionalLight"
          color={"#ffb647"}
          position={[500, 500, 500]}
          intensity={2}
        />
        {/* </SheetProvider> */}
        <color args={["#333"]} attach={"background"} />
        <ambientLight intensity={0.5} />
        <ScrollControls damping={0.3} pages={5}>
          <Scene2 />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
