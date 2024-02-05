import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Reflector,
  Text,
  useTexture,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { IoMdMicrophone } from "react-icons/io";
import Image from "next/image";
import { SlVolume2, SlVolumeOff } from "react-icons/sl";
import ProniteCard from "@/src/components/pronites/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Dhvani from "@/src/components/pronites/dhvani";

// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";
// import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
// import { getProject } from "@theatre/core";

// studio.extend(extension);
// studio.initialize();

// const demoSheet = getProject("Scene 1").sheet("Scene 1");

const artists = [
  {
    name: "Dhvani Bhanushali",
    time: "23rd Feb @ 7:30PM",
    imageSrc: "/assets/jpeg/DhvaniBhanushali.jpeg",
    audioSrc: "/assets/mp3/DhvaniBhanushali.mp3",
  },
  {
    name: "Artist 2",
    time: "24th Feb @ 7:30PM",
    imageSrc: "/assets/jpeg/DhvaniBhanushali.jpeg",
    audioSrc: "/assets/mp3/DhvaniBhanushali.mp3",
  },
];

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isArtist1, setIsArtist1] = useState(true);
  const angle = useRef<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    angle.current = angle.current + Math.PI;
    audioRef.current &&
      (audioRef.current.src = artists[isArtist1 ? 0 : 1].audioSrc);
    audioRef.current && (audioRef.current.currentTime = 0);
    audioRef.current?.play();
    console.log(audioRef.current?.paused);
    // }, [isArtist1]);
  }, []);

  const artistGroup = useRef<THREE.Group | null>(null);
  const nameGroup = useRef<THREE.Group | null>(null);

  // useGSAP(() => {
  //   if (artistGroup.current && nameGroup.current) {
  //     gsap.to(artistGroup.current.rotation, {
  //       y: angle.current,
  //       duration: 1,
  //     });
  //     gsap.to(nameGroup.current.rotation, {
  //       y: -angle.current,
  //       duration: 1,
  //     });
  //   }
  // }, [isArtist1]);

  return (
    <>
      <ProniteCard
        artist={{ ...artists[0] }}
        // isArtist={isArtist1}
        isArtist={true}
      />
      {/* <ProniteCard artist={{ ...artists[1] }} isArtist={!isArtist1} /> */}
      <button
        onClick={() => {
          if (audioRef.current) audioRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }}
        className="absolute text-white top-[72px] right-3 z-50 cursor-pointer"
      >
        {isMuted ? (
          <SlVolumeOff className="w-8 h-8 transition-colors duration-150" />
        ) : (
          <SlVolume2 className="w-8 h-8 transition-colors duration-150" />
        )}
      </button>
      <audio ref={audioRef} loop={true}></audio>
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        gl={{ alpha: false }}
        camera={{ position: [0, 3, 100], fov: 15 }}
        onClick={() => setIsArtist1(!isArtist1)}
      >
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <group ref={artistGroup}>
              <Dhvani position={[0, 0, 1]} scale={1} rotation={[0, 0, 0]} />
              {/* <Dhvani
                position={[0, 0, 0]}
                scale={1}
                rotation={[0, Math.PI, 0]}
              /> */}
            </group>
            <group ref={nameGroup}>
              <VideoText position={[0, 1, -1]} />
            </group>
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={1} />
          <directionalLight position={[-50, 0, -40]} intensity={5} />
          <Intro />
        </Suspense>
      </Canvas>
    </>
  );
}

function Carla(props: {
  scale: number[];
  position: number[];
  rotation: number[];
}) {
  const { scene } = useGLTF("/assets/pronite/carla-draco.glb");
  return <primitive object={scene} {...props} />;
}

function VideoText(props: { position: [x: number, y: number, z: number] }) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/assets/mp4/proniteVID2.mp4",
      // src: "/assets/mp4/DhvaniBhanushali.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);

  const [size, setSize] = useState<{ height: number; width: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setSize({ height: window.innerHeight, width: window.innerWidth });
      });
    }
  }, []);

  return (
    <Text
      font="/font/Inter-Bold.woff"
      fontSize={Math.min((size.width * (2 - 0.1)) / (1920 - 720), 2)}
      letterSpacing={-0.06}
      {...props}
    >
      Dhvani
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          colorSpace={THREE.SRGBColorSpace}
        />
      </meshBasicMaterial>
    </Text>
  );
}

function Ground() {
  const [floor, normal] = useTexture([
    "/assets/pronite/SurfaceImperfections003_1K_var1.jpg",
    "/assets/pronite/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={512}
        mirror={0.5}
        mixBlur={6}
        mixStrength={1.5}
        color="#a0a0a0"
        metalness={0.4}
        roughnessMap={floor}
        normalMap={normal}
        normalScale={new THREE.Vector2(2, 2)}
      />
    </mesh>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.pointer.x * 5, 3 + state.pointer.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}
