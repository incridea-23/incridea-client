import {
  PerspectiveCamera,
  Text,
  useAnimations,
  useFBX,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { Dispatch, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import ProniteAnnotation from "./proniteAnnotation";
import Timer from "./timer";
import { baseAudioUrl, baseImageUrl } from "@/src/utils/url";

type GLTFResult = GLTF & {
  nodes: {
    lamp: THREE.Mesh;
    portalStone: THREE.Mesh;
    skybox: THREE.Mesh;
    stones: THREE.Mesh;
    tree: THREE.Mesh;
    dice1: THREE.Mesh;
    dice2: THREE.Mesh;
    ground1: THREE.Mesh;
    ground2: THREE.Mesh;
    ground3: THREE.Mesh;
    ground4: THREE.Mesh;
    Woosh_01: THREE.Mesh;
    Woosh_02: THREE.Mesh;
    Plane001: THREE.Mesh;
    Plane001_1: THREE.Mesh;
    mask_acc_2: THREE.Mesh;
    mask_acc_2001: THREE.Mesh;
    mask_acc_3: THREE.Mesh;
    mask_acc_3001: THREE.Mesh;
    mask_acc_4: THREE.Mesh;
    mask_acc_4001: THREE.Mesh;
    mask_acc_5: THREE.Mesh;
    mask_acc_5001: THREE.Mesh;
    Plane005: THREE.Mesh;
    Gas_Mask: THREE.Mesh;
    Gas_Mask001: THREE.Mesh;
    Torus: THREE.Mesh;
    Torus001: THREE.Mesh;
    Torus002: THREE.Mesh;
    Torus003: THREE.Mesh;
    Object_10: THREE.SkinnedMesh;
    Object_11: THREE.SkinnedMesh;
    Object_12: THREE.SkinnedMesh;
    Object_13: THREE.SkinnedMesh;
    Object_14: THREE.SkinnedMesh;
    Object_17: THREE.SkinnedMesh;
    Object_18: THREE.SkinnedMesh;
    Object_19: THREE.SkinnedMesh;
    Object_20: THREE.SkinnedMesh;
    Object_3: THREE.SkinnedMesh;
    Object_5: THREE.SkinnedMesh;
    Object_6: THREE.SkinnedMesh;
    Object_7: THREE.SkinnedMesh;
    Object_8: THREE.SkinnedMesh;
    Object_9: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Stones: THREE.MeshPhysicalMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    Tree: THREE.MeshPhysicalMaterial;
    ["Material for Bake"]: THREE.MeshStandardMaterial;
    final_alfa: THREE.MeshStandardMaterial;
    final_C: THREE.MeshStandardMaterial;
    final_E: THREE.MeshStandardMaterial;
    ["final_A.002"]: THREE.MeshStandardMaterial;
    Woosh: THREE.MeshStandardMaterial;
    ["Woosh.012"]: THREE.MeshStandardMaterial;
    ["Cloth3.002"]: THREE.MeshPhysicalMaterial;
    ["Cloth3.003"]: THREE.MeshPhysicalMaterial;
    ["Plastic.002"]: THREE.MeshPhysicalMaterial;
    ["Plastic.003"]: THREE.MeshPhysicalMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["Color_B18.001"]: THREE.MeshStandardMaterial;
    ["Color_G25.001"]: THREE.MeshStandardMaterial;
    ["Mat1.001"]: THREE.MeshStandardMaterial;
    ["Material_00041e1.001"]: THREE.MeshStandardMaterial;
    ["Material_0008f1.001"]: THREE.MeshStandardMaterial;
    ["Color_000_1.001"]: THREE.MeshStandardMaterial;
    ["Color_A11.001"]: THREE.MeshStandardMaterial;
    ["Color_001_1.001"]: THREE.MeshStandardMaterial;
    ["Color_002_1.001"]: THREE.MeshStandardMaterial;
    ["Color_001.001"]: THREE.MeshStandardMaterial;
    ["Color_002.001"]: THREE.MeshStandardMaterial;
    ["Color_B04.001"]: THREE.MeshStandardMaterial;
  };
};

type ActionName = "CameraAction";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;
interface Scene2Props {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setInstruction: Dispatch<boolean>;
}

const Scene2: React.FC<Scene2Props> = ({
  isMuted,
  setIsMuted,
  setInstruction,
  ...props
}) => {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const fbx = useFBX(`/assets/3d/ryokoAnimation.fbx`) as THREE.Object3D;
  const fbxAnimation = fbx.animations;
  const { nodes, materials, animations } = useGLTF(
    `${baseImageUrl}/assets/3d/level3.glb`
  ) as GLTFResult;
  const { actions, names } = useAnimations(animations, group);
  const fbxAnimationClips = useAnimations(fbxAnimation, group);

  const playedSecondAudioRef = useRef(false);
  const netherSound = useRef<HTMLAudioElement | null>(null);

  const playSecondAudio = () => {
    if (!isMuted) {
      netherSound.current = new Audio(
        `${baseAudioUrl}/audio/level3/nether.mp3`
      );
      netherSound.current.volume = 0.5;
      netherSound.current.play();
      playedSecondAudioRef.current = true;
    }
  };

  useFrame(() => {
    const normalizedScroll = scroll.offset;
    if (normalizedScroll > 0.7 && !playedSecondAudioRef.current) {
      playSecondAudio();
    }
    if (scroll.offset > 0.01) {
      setInstruction(false);
    } else {
      setInstruction(true);
    }
  });

  useEffect(() => {
    if (netherSound.current) {
      netherSound.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (actions.CameraAction) actions.CameraAction.reset().paused = true;
  }, [actions, names, scroll]);

  useEffect(() => {
    if (fbxAnimationClips.actions["mixamo.com"])
      fbxAnimationClips.actions["mixamo.com"].reset().play();
  }, [fbxAnimationClips]);

  useFrame(() => {
    if (actions.CameraAction) {
      actions.CameraAction.play();
      actions.CameraAction.time =
        actions.CameraAction.getClip().duration * scroll.offset;
      actions.CameraAction.paused = true;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={10000}
          near={0.1}
          fov={30}
          position={[-5.115, -9.236, 24.65]}
          rotation={[0.042, 0.022, 0.013]}
          scale={0.004}
        />
        <mesh
          name="lamp"
          castShadow
          receiveShadow
          geometry={nodes.lamp.geometry}
          material={materials.Stones}
          position={[-15.455, -5.188, 5.834]}
        />
        <mesh
          name="portalStone"
          castShadow
          receiveShadow
          geometry={nodes.portalStone.geometry}
          material={materials.Stones}
          position={[-19.207, -4.744, 6.608]}
        />
        <mesh
          name="skybox"
          castShadow
          receiveShadow
          geometry={nodes.skybox.geometry}
          material={materials["Material.002"]}
          position={[-8.164, -5.993, 8.406]}
        />
        <mesh
          name="stones"
          castShadow
          receiveShadow
          geometry={nodes.stones.geometry}
          material={materials.Stones}
          position={[-18.514, -5.75, 7.791]}
        />
        <mesh
          name="tree"
          castShadow
          receiveShadow
          geometry={nodes.tree.geometry}
          material={materials.Tree}
          position={[-21.183, -3.707, 4.183]}
        />
        <Timer position={[-17.75, 1.1, 2.5]} rotation={[0, 0, 0]} />
        <mesh
          name="dice1"
          castShadow
          receiveShadow
          geometry={nodes.dice1.geometry}
          material={materials["Material for Bake"]}
          position={[-19.278, -3.674, 5.68]}
        />
        <mesh
          name="dice2"
          castShadow
          receiveShadow
          geometry={nodes.dice2.geometry}
          material={materials["Material for Bake"]}
          position={[-17.828, -4.081, 5.234]}
        />
        <mesh
          name="ground1"
          castShadow
          receiveShadow
          geometry={nodes.ground1.geometry}
          material={materials.final_alfa}
          position={[-10.205, -5.532, 5.841]}
        />
        <mesh
          name="ground2"
          castShadow
          receiveShadow
          geometry={nodes.ground2.geometry}
          material={materials.final_C}
          position={[-10.205, -5.532, 5.841]}
        >
          <ProniteAnnotation />
        </mesh>
        <mesh
          name="ground3"
          castShadow
          receiveShadow
          geometry={nodes.ground3.geometry}
          material={materials.final_E}
          position={[-10.205, -5.532, 5.841]}
        />
        <mesh
          name="ground4"
          castShadow
          receiveShadow
          geometry={nodes.ground4.geometry}
          material={materials["final_A.002"]}
          position={[9.04, -43.416, 37.149]}
        />
        <mesh
          name="Woosh_01"
          castShadow
          receiveShadow
          geometry={nodes.Woosh_01.geometry}
          material={materials.Woosh}
          position={[-18.389, -3.637, 5.746]}
        />
        <mesh
          name="Woosh_02"
          castShadow
          receiveShadow
          geometry={nodes.Woosh_02.geometry}
          material={materials["Woosh.012"]}
          position={[-18.755, -3.637, 5.211]}
        />
        <group name="mask001" position={[-18.487, -4.377, 5.52]}>
          <mesh
            name="Plane001"
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials["Cloth3.002"]}
          />
          <mesh
            name="Plane001_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
            material={materials["Cloth3.003"]}
          />
        </group>
        <group>
          <mesh
            name="mask_acc_2"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_2.geometry}
            material={materials["Plastic.002"]}
            position={[-18.665, -4.363, 5.567]}
          />
          <mesh
            name="mask_acc_2001"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_2001.geometry}
            material={materials["Plastic.002"]}
            position={[-18.355, -4.326, 5.489]}
          />
          <mesh
            name="mask_acc_3"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_3.geometry}
            material={materials["Plastic.002"]}
            position={[-18.602, -4.318, 5.6]}
          />
          <mesh
            name="mask_acc_3001"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_3001.geometry}
            material={materials["Plastic.002"]}
            position={[-18.411, -4.29, 5.549]}
          />
          <mesh
            name="mask_acc_4"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_4.geometry}
            material={materials["Plastic.003"]}
            position={[-18.742, -4.414, 5.499]}
          />
          <mesh
            name="mask_acc_4001"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_4001.geometry}
            material={materials["Plastic.002"]}
            position={[-18.309, -4.348, 5.391]}
          />
          <mesh
            name="mask_acc_5"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_5.geometry}
            material={materials["Plastic.002"]}
            position={[-18.56, -4.371, 5.649]}
          />
          <mesh
            name="mask_acc_5001"
            castShadow
            receiveShadow
            geometry={nodes.mask_acc_5001.geometry}
            material={materials["Plastic.002"]}
            position={[-18.412, -4.351, 5.613]}
          />
          <mesh
            name="Plane005"
            castShadow
            receiveShadow
            geometry={nodes.Plane005.geometry}
            material={materials["Plastic.002"]}
            position={[-18.536, -4.197, 5.545]}
          />
          <mesh
            name="Gas_Mask"
            castShadow
            receiveShadow
            geometry={nodes.Gas_Mask.geometry}
            material={materials["Material.001"]}
            position={[-18.784, -4.467, 5.64]}
          />
          <mesh
            name="Gas_Mask001"
            castShadow
            receiveShadow
            geometry={nodes.Gas_Mask001.geometry}
            material={materials["Material.004"]}
            position={[-18.199, -4.376, 5.52]}
          />
          <mesh
            name="Torus"
            castShadow
            receiveShadow
            geometry={nodes.Torus.geometry}
            material={materials["Material.005"]}
            position={[-18.798, -4.464, 5.66]}
          />
          <mesh
            name="Torus001"
            castShadow
            receiveShadow
            geometry={nodes.Torus001.geometry}
            material={materials["Material.006"]}
            position={[-18.798, -4.465, 5.661]}
          />
          <mesh
            name="Torus002"
            castShadow
            receiveShadow
            geometry={nodes.Torus002.geometry}
            material={materials["Material.007"]}
            position={[-18.185, -4.373, 5.526]}
          />
          <mesh
            name="Torus003"
            castShadow
            receiveShadow
            geometry={nodes.Torus003.geometry}
            material={materials["Material.009"]}
            position={[-18.182, -4.371, 5.527]}
          />
        </group>
        <group
          name="Altar+Ibn-La'Ahad+(Assassin's+Creed)objcleanergles"
          position={[-15.304, -6.251, 8.785]}
          rotation={[0, (-Math.PI * 150) / 180, 0]}
          scale={0.646}
        >
          <group name="Object_2" />
        </group>
        <group
          rotation={[0, (-Math.PI * 150) / 180, 0]}
          name="Armature"
          position={[-15.07, -6.587, 8.863]}
          scale={0.000387}
        >
          <skinnedMesh
            name="Object_10"
            geometry={nodes.Object_10.geometry}
            material={materials["Color_B18.001"]}
            skeleton={nodes.Object_10.skeleton}
          />
          <skinnedMesh
            name="Object_11"
            geometry={nodes.Object_11.geometry}
            material={materials["Color_B18.001"]}
            skeleton={nodes.Object_11.skeleton}
          />
          <skinnedMesh
            name="Object_12"
            geometry={nodes.Object_12.geometry}
            material={materials["Color_B18.001"]}
            skeleton={nodes.Object_12.skeleton}
          />
          <skinnedMesh
            name="Object_13"
            geometry={nodes.Object_13.geometry}
            material={materials["Color_G25.001"]}
            skeleton={nodes.Object_13.skeleton}
          />
          <skinnedMesh
            name="Object_14"
            geometry={nodes.Object_14.geometry}
            material={materials["Mat1.001"]}
            skeleton={nodes.Object_14.skeleton}
          />
          <skinnedMesh
            name="Object_17"
            geometry={nodes.Object_17.geometry}
            material={materials["Material_00041e1.001"]}
            skeleton={nodes.Object_17.skeleton}
          />
          <skinnedMesh
            name="Object_18"
            geometry={nodes.Object_18.geometry}
            material={materials["Material_0008f1.001"]}
            skeleton={nodes.Object_18.skeleton}
          />
          <skinnedMesh
            name="Object_19"
            geometry={nodes.Object_19.geometry}
            material={materials["Material_0008f1.001"]}
            skeleton={nodes.Object_19.skeleton}
          />
          <skinnedMesh
            name="Object_20"
            geometry={nodes.Object_20.geometry}
            material={materials["Color_000_1.001"]}
            skeleton={nodes.Object_20.skeleton}
          />
          <skinnedMesh
            name="Object_3"
            geometry={nodes.Object_3.geometry}
            material={materials["Color_A11.001"]}
            skeleton={nodes.Object_3.skeleton}
          />
          <skinnedMesh
            name="Object_5"
            geometry={nodes.Object_5.geometry}
            material={materials["Color_001_1.001"]}
            skeleton={nodes.Object_5.skeleton}
          />
          <skinnedMesh
            name="Object_6"
            geometry={nodes.Object_6.geometry}
            material={materials["Color_002_1.001"]}
            skeleton={nodes.Object_6.skeleton}
          />
          <skinnedMesh
            name="Object_7"
            geometry={nodes.Object_7.geometry}
            material={materials["Color_001.001"]}
            skeleton={nodes.Object_7.skeleton}
          />
          <skinnedMesh
            name="Object_8"
            geometry={nodes.Object_8.geometry}
            material={materials["Color_002.001"]}
            skeleton={nodes.Object_8.skeleton}
          />
          <skinnedMesh
            name="Object_9"
            geometry={nodes.Object_9.geometry}
            material={materials["Color_B04.001"]}
            skeleton={nodes.Object_9.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(`${baseImageUrl}/assets/3d/level3.glb`);

export default Scene2;
