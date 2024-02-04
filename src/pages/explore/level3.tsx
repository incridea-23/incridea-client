import Scene2 from "@/src/components/scene2";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Level3() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <directionalLight
          color={"#ffb647"}
          position={[500, 500, 500]}
          intensity={2}
        />
        <color args={["#333"]} attach={"background"} />
        <ambientLight intensity={0.5} />
        <ScrollControls damping={0.3} pages={5}>
          <Scene2 />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
