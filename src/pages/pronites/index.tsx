import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, useTexture, MeshReflectorMaterial } from "@react-three/drei";
import { SlVolume2, SlVolumeOff } from "react-icons/sl";
import ProniteCard from "@/src/components/pronites/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Dhvani from "@/src/components/pronites/dhvani";
import Nakash from "@/src/components/pronites/nakash";
import { baseImageUrl, baseAudioUrl } from "@/src/utils/url";
import Loader from "@/src/components/pronite/loader";
import { useProgress } from "@react-three/drei";
import Info from "@/src/components/pronites/info";

const artists = [
  {
    name: "Dhvani Bhanushali",
    time: "23rd Feb @ 7PM",
    imageSrc: `${baseImageUrl}/assets/jpeg/DhvaniBhanushali.jpeg`,
    audioSrc: `${baseAudioUrl}/assets/mp3/DhvaniBhanushali.mp3`,
  },
  {
    name: "Nakash Aziz",
    time: "24th Feb @ 7PM",
    imageSrc: `${baseImageUrl}/assets/jpeg/Nakash.jpeg`,
    audioSrc: `${baseAudioUrl}/assets/mp3/NakashAziz.mp3`,
  },
];

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isArtist1, setIsArtist1] = useState(true);
  const angle = useRef<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timer | null>(null);

  const [instruction, setInstruction] = useState<boolean>(true);

  const { progress, total, loaded } = useProgress();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (progress === 100 && loaded === total) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [progress, loaded, total]);

  useEffect(() => {
    if (!loading) {
      audioRef.current &&
        (audioRef.current.src = artists[isArtist1 ? 0 : 1].audioSrc);
      audioRef.current && (audioRef.current.currentTime = 0);
      audioRef.current?.play();

      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => {
          setIsArtist1(!isArtist1);
          angle.current = angle.current + Math.PI;
        }, 15000);
      } else {
        timeRef.current = setTimeout(() => {
          setIsArtist1(!isArtist1);
          angle.current = angle.current + Math.PI;
        }, 15000);
      }
    }
  }, [isArtist1, loading]);

  const artistGroup = useRef<THREE.Group | null>(null);
  const nameGroup = useRef<THREE.Group | null>(null);

  useGSAP(() => {
    if (artistGroup.current && nameGroup.current) {
      gsap.to(artistGroup.current.rotation, {
        y: -angle.current,
        duration: 1,
      });
      gsap.to(nameGroup.current.rotation, {
        y: angle.current,
        duration: 1,
      });
    }
  }, [isArtist1]);

  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ProniteCard
        artist={{ ...artists[0] }}
        isArtist={isArtist1}
        gradient="pink"
      />
      <ProniteCard
        artist={{ ...artists[1] }}
        isArtist={!isArtist1}
        gradient="blue"
      />
      <Info />
      <button
        onClick={() => {
          if (audioRef.current) audioRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }}
        className="absolute text-white top-[95px] right-3 z-50 cursor-pointer"
      >
        {isMuted ? (
          <SlVolumeOff className="w-8 h-8 transition-colors duration-150" />
        ) : (
          <SlVolume2 className="w-8 h-8 transition-colors duration-150" />
        )}
      </button>
      <audio ref={audioRef} loop={true} muted={isMuted}></audio>
      {instruction && !loading && (
        <div className="animate-pulse absolute bottom-48 md:bottom-56 lg:bottom-10 opacity-65 text-gray-400 left-1/2 -translate-x-1/2 z-50 text-base md:text-lg xl:text-xl">
          Click to see next artist
        </div>
      )}
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        gl={{ alpha: false }}
        camera={{ position: [0, 3, 100], fov: 15 }}
        onClick={() => {
          angle.current = angle.current + Math.PI;
          setIsArtist1(!isArtist1);
          setInstruction(false);
        }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <group ref={artistGroup}>
              <Dhvani position={[0, 0, 1]} scale={0.9} rotation={[0, 0, 0]} />
              <Nakash
                position={[0, 0, 0]}
                scale={1}
                rotation={[0, Math.PI, 0]}
              />
            </group>
            <group ref={nameGroup} position={[0, 0, 6]}>
              <DhvaniText position={[0, 1, -8]} />
              <NakashText position={[0, 1, 8]} />
            </group>
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={1} />
          <directionalLight position={[-50, 0, -40]} intensity={5} />
          <Intro />
        </Suspense>
      </Canvas>
      <Loader loading={loading} />
    </>
  );
}

function DhvaniText(props: { position: [x: number, y: number, z: number] }) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: `${baseAudioUrl}/assets/mp4/dhvani.mp4`,
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

function NakashText(props: { position: [x: number, y: number, z: number] }) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: `${baseAudioUrl}/assets/mp4/nakash.mp4`,
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
      rotation={[0, Math.PI, 0]}
    >
      Nakash
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
    `${baseImageUrl}/assets/pronite/SurfaceImperfections003_1K_var1.jpg`,
    `${baseImageUrl}/assets/pronite/SurfaceImperfections003_1K_Normal.jpg`,
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
