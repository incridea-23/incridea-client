import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    UnionAvatars_Body001: THREE.SkinnedMesh;
    UnionAvatars_Bottom001: THREE.SkinnedMesh;
    UnionAvatars_Hair001: THREE.SkinnedMesh;
    Mesh003: THREE.SkinnedMesh;
    Mesh003_1: THREE.SkinnedMesh;
    UnionAvatars_Shoes001: THREE.SkinnedMesh;
    UnionAvatars_Top001: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    ["UnionAvatars_Body.001"]: THREE.MeshStandardMaterial;
    ["UnionAvatars_Bottom.001"]: THREE.MeshStandardMaterial;
    ["generated.png.001"]: THREE.MeshStandardMaterial;
    ["model.jpg.001"]: THREE.MeshStandardMaterial;
    ["UnionAvatars_Neck.001"]: THREE.MeshStandardMaterial;
    ["UnionAvatars_Shoes.001"]: THREE.MeshStandardMaterial;
    ["UnionAvatars_Top.001"]: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Armature.001|mixamo.com|Layer0";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Nakash(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group | null>(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/3d/naakashAnimated.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["Armature.001|mixamo.com|Layer0"]) {
      actions["Armature.001|mixamo.com|Layer0"].reset().play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature001">
          <skinnedMesh
            name="UnionAvatars_Body001"
            geometry={nodes.UnionAvatars_Body001.geometry}
            material={materials["UnionAvatars_Body.001"]}
            skeleton={nodes.UnionAvatars_Body001.skeleton}
          />
          <skinnedMesh
            name="UnionAvatars_Bottom001"
            geometry={nodes.UnionAvatars_Bottom001.geometry}
            material={materials["UnionAvatars_Bottom.001"]}
            skeleton={nodes.UnionAvatars_Bottom001.skeleton}
          />
          <skinnedMesh
            name="UnionAvatars_Hair001"
            geometry={nodes.UnionAvatars_Hair001.geometry}
            material={materials["generated.png.001"]}
            skeleton={nodes.UnionAvatars_Hair001.skeleton}
          />
          <group name="UnionAvatars_Head001">
            <skinnedMesh
              name="Mesh003"
              geometry={nodes.Mesh003.geometry}
              material={materials["model.jpg.001"]}
              skeleton={nodes.Mesh003.skeleton}
              morphTargetDictionary={nodes.Mesh003.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh003.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh003_1"
              geometry={nodes.Mesh003_1.geometry}
              material={materials["UnionAvatars_Neck.001"]}
              skeleton={nodes.Mesh003_1.skeleton}
              morphTargetDictionary={nodes.Mesh003_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh003_1.morphTargetInfluences}
            />
          </group>
          <skinnedMesh
            name="UnionAvatars_Shoes001"
            geometry={nodes.UnionAvatars_Shoes001.geometry}
            material={materials["UnionAvatars_Shoes.001"]}
            skeleton={nodes.UnionAvatars_Shoes001.skeleton}
          />
          <skinnedMesh
            name="UnionAvatars_Top001"
            geometry={nodes.UnionAvatars_Top001.geometry}
            material={materials["UnionAvatars_Top.001"]}
            skeleton={nodes.UnionAvatars_Top001.skeleton}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3d/naakashAnimated.glb");
