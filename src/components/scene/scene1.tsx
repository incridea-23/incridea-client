import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useCurrentSheet } from "@theatre/r3f";
import { useFrame } from "@react-three/fiber";
import { ISheet, val } from "@theatre/core";

type GLTFResult = GLTF & {
  nodes: {
    hw_wandaoyou_daolu_01_hw_dixing_0: THREE.Mesh;
    hw_wandaoyou_dimian_01_hw_dixing_02_0: THREE.Mesh;
    hw_wandaoyou_peijing_01_hw_peijing_01_0: THREE.Mesh;
    hw_wandaoyou_peijing_01_hw_peijing_01_0001: THREE.Mesh;
    hw_wandaoyou_peijing_02_hw_peijing_02_0: THREE.Mesh;
    hw_zhidao210_daolu_01_hw_dixing_0: THREE.Mesh;
    hw_zhidao210_daolu_02_hw_dixing_0: THREE.Mesh;
    hw_zhidao210_daolu_03_hw_dixing_0: THREE.Mesh;
    hw_zhidao210_dimian_01_hw_dixing_02_0: THREE.Mesh;
    hw_zhidao210_dimian_01_hw_dixing_02_0001: THREE.Mesh;
    hw_zhidao210_dimian_02_hw_dixing_02_0: THREE.Mesh;
    hw_zhidao210_dimian_03_hw_dixing_02_0: THREE.Mesh;
    hw_zhidao210_peijing_01_hw_peijing_01_0: THREE.Mesh;
    hw_zhidao210_peijing_02_hw_peijing_02_0: THREE.Mesh;
    hw_zhidao210_peijing_03_hw_peijing_01_0: THREE.Mesh;
    hw_zhidao210_peijing_04_hw_peijing_02_0: THREE.Mesh;
    hw_zhidao210_peijing_05_hw_peijing_01_0: THREE.Mesh;
    hw_zhidao210_peijing_06_hw_peijing_02_0: THREE.Mesh;
    PokeBall: THREE.Mesh;
  };
  materials: {
    hw_dixing_0: THREE.MeshStandardMaterial;
    hw_dixing_02_0: THREE.MeshStandardMaterial;
    hw_peijing_01_2: THREE.MeshStandardMaterial;
    hw_peijing_02_2: THREE.MeshStandardMaterial;
    hw_dixing: THREE.MeshStandardMaterial;
    hw_dixing_1: THREE.MeshStandardMaterial;
    hw_dixing_2: THREE.MeshStandardMaterial;
    hw_dixing_02: THREE.MeshStandardMaterial;
    hw_dixing_02_2: THREE.MeshStandardMaterial;
    hw_dixing_02_1: THREE.MeshStandardMaterial;
    hw_peijing_01: THREE.MeshStandardMaterial;
    hw_peijing_02_1: THREE.MeshStandardMaterial;
    hw_peijing_01_0: THREE.MeshStandardMaterial;
    hw_peijing_02: THREE.MeshStandardMaterial;
    hw_peijing_01_1: THREE.MeshStandardMaterial;
    hw_peijing_02_0: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshBasicMaterial;
  };
};

export function Scene1(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/3d/level2.glb") as GLTFResult;
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  // console.log(scroll);

  useFrame(() => {
    const sequenceLength = val((sheet as ISheet).sequence.pointer.length);
    sheet && (sheet.sequence.position = scroll.offset * sequenceLength);
  });
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 0, 62999.996]}>
            <group position={[0, 0, -0.008]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.hw_wandaoyou_daolu_01_hw_dixing_0.geometry}
                material={materials.hw_dixing_0}
                position={[0, 0.004, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 63000.027]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hw_wandaoyou_dimian_01_hw_dixing_02_0.geometry}
              material={materials.hw_dixing_02_0}
              position={[0, -0.01, -63000.031]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, 0, 62999.996]}>
            <group position={[0, 0, -0.008]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_wandaoyou_peijing_01_hw_peijing_01_0.geometry
                }
                material={materials.hw_peijing_01_2}
                position={[0, 0.004, 0]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_wandaoyou_peijing_01_hw_peijing_01_0001.geometry
                }
                material={materials.hw_peijing_01_2}
                position={[-5538.124, -4496.546, -3724.88]}
              />
            </group>
          </group>
          <group position={[0, 0, 62999.996]}>
            <group position={[0, 0, -0.008]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_wandaoyou_peijing_02_hw_peijing_02_0.geometry
                }
                material={materials.hw_peijing_02_2}
                position={[0, 0.004, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 20999.998]}>
            <group position={[0, 0, 0.002]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.hw_zhidao210_daolu_02_hw_dixing_0.geometry}
                material={materials.hw_dixing_1}
                position={[0, 0.002, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 41999.996]}>
            <group position={[0, 0, 0.004]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.hw_zhidao210_daolu_03_hw_dixing_0.geometry}
                material={materials.hw_dixing_2}
                position={[0, 0.004, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 20999.98]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hw_zhidao210_dimian_02_hw_dixing_02_0.geometry}
              material={materials.hw_dixing_02_2}
              position={[0, -0.003, -20999.979]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, 0, 41999.996]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hw_zhidao210_dimian_03_hw_dixing_02_0.geometry}
              material={materials.hw_dixing_02_1}
              position={[0, -0.007, -41999.863]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, 0, 20999.998]}>
            <group position={[0, 0, 0.002]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_zhidao210_peijing_03_hw_peijing_01_0.geometry
                }
                material={materials.hw_peijing_01_0}
                position={[0, 0.002, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 20999.998]}>
            <group position={[0, 0, 0.002]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_zhidao210_peijing_04_hw_peijing_02_0.geometry
                }
                material={materials.hw_peijing_02}
                position={[0, 0.002, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 41999.996]}>
            <group position={[0, 0, 0.004]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_zhidao210_peijing_05_hw_peijing_01_0.geometry
                }
                material={materials.hw_peijing_01_1}
                position={[0, 0.004, 0]}
              />
            </group>
          </group>
          <group position={[0, 0, 41999.996]}>
            <group position={[0, 0, 0.004]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={
                  nodes.hw_zhidao210_peijing_06_hw_peijing_02_0.geometry
                }
                material={materials.hw_peijing_02_0}
                position={[0, 0.004, 0]}
              />
            </group>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hw_zhidao210_daolu_01_hw_dixing_0.geometry}
            material={materials.hw_dixing}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hw_zhidao210_dimian_01_hw_dixing_02_0.geometry}
              material={materials.hw_dixing_02}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hw_zhidao210_dimian_01_hw_dixing_02_0001.geometry}
              material={materials.hw_dixing_02}
              position={[-22868.639, -11873.297, 79.884]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hw_zhidao210_peijing_01_hw_peijing_01_0.geometry}
            material={materials.hw_peijing_01}
            position={[0, 0, -0.001]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hw_zhidao210_peijing_02_hw_peijing_02_0.geometry}
            material={materials.hw_peijing_02_1}
            position={[0, 0, -0.001]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PokeBall.geometry}
        material={materials["Material.003"]}
        position={[-1.751, 0.37, 23.821]}
      />
    </group>
  );
}

useGLTF.preload("/assets/3d/level2.glb");
