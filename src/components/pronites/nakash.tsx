import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useFBX } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { baseImageUrl } from "@/src/utils/url";

type GLTFResult = GLTF & {
  nodes: {
    avaturn_body: THREE.SkinnedMesh;
    avaturn_hair_0: THREE.SkinnedMesh;
    avaturn_hair_1: THREE.SkinnedMesh;
    avaturn_look_0: THREE.SkinnedMesh;
    avaturn_shoes_0: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    ["avaturn_body_material.002"]: THREE.MeshStandardMaterial;
    ["avaturn_hair_0_material.002"]: THREE.MeshStandardMaterial;
    ["avaturn_hair_1_material.002"]: THREE.MeshStandardMaterial;
    ["avaturn_look_0_material.002"]: THREE.MeshStandardMaterial;
    ["avaturn_shoes_0_material.002"]: THREE.MeshStandardMaterial;
  };
};

export default function Nakash(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group | null>(null);
  const { nodes, materials } = useGLTF(
    `${baseImageUrl}/assets/3d/naakashAnimated.glb`
  ) as GLTFResult;
  // const { actions } = useAnimations(animations, group);
  const { animations } = useFBX("/assets/3d/nakashSinging.fbx");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]]?.reset().play();
  }, [actions, names]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="avaturn_body"
            geometry={nodes.avaturn_body.geometry}
            material={materials["avaturn_body_material.002"]}
            skeleton={nodes.avaturn_body.skeleton}
          />
          <skinnedMesh
            name="avaturn_hair_0"
            geometry={nodes.avaturn_hair_0.geometry}
            material={materials["avaturn_hair_0_material.002"]}
            skeleton={nodes.avaturn_hair_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_hair_1"
            geometry={nodes.avaturn_hair_1.geometry}
            material={materials["avaturn_hair_1_material.002"]}
            skeleton={nodes.avaturn_hair_1.skeleton}
          />
          <skinnedMesh
            name="avaturn_look_0"
            geometry={nodes.avaturn_look_0.geometry}
            material={materials["avaturn_look_0_material.002"]}
            skeleton={nodes.avaturn_look_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_shoes_0"
            geometry={nodes.avaturn_shoes_0.geometry}
            material={materials["avaturn_shoes_0_material.002"]}
            skeleton={nodes.avaturn_shoes_0.skeleton}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(`${baseImageUrl}/assets/3d/naakashAnimated.glb`);
