import * as THREE from "three";
import React, { Dispatch, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useCurrentSheet } from "@theatre/r3f";
import { useFrame } from "@react-three/fiber";
import { ISheet, val } from "@theatre/core";
import Annotation from "./annotation";
import Sponsor from "./sponsor";
import Level3 from "./level3Button";
import { baseImageUrl } from "@/src/utils/url";

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
    hw_zhidao210_peijing_05_hw_peijing_01_0001: THREE.Mesh;
    hw_zhidao210_peijing_05_hw_peijing_01_0002: THREE.Mesh;
    hw_zhidao210_peijing_06_hw_peijing_02_0: THREE.Mesh;
    PokeBall: THREE.Mesh;
    Book: THREE.Mesh;
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
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshPhysicalMaterial;
  };
};

export default function Scene1({
  setInstruction,
}: {
  setInstruction: Dispatch<boolean>;
}) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    `${baseImageUrl}/assets/3d/level2-sponsorBook4.glb`,
    true
  ) as GLTFResult;
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val((sheet as ISheet).sequence.pointer.length);
    sheet && (sheet.sequence.position = scroll.offset * sequenceLength);
    if (scroll.offset > 0.01) {
      setInstruction(false);
    } else {
      setInstruction(true);
    }
  });
  return (
    <>
      <group dispose={null}>
        <group name="Scene">
          <group
            name="Sketchfab_model"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          >
            <group name="11FBX" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_2">
                <group name="RootNode">
                  <group
                    name="Camera001"
                    position={[17.694, 523.344, 928.164]}
                    rotation={[0.178, -1.527, -0.262]}
                  >
                    <group name="Object_45" />
                  </group>
                  <group
                    name="hw_wandaoyou_daolu_01"
                    position={[0, 0, 62999.996]}
                  >
                    <group
                      name="Object_32"
                      position={[0, 0, -0.008]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_wandaoyou_daolu_01_hw_dixing_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_wandaoyou_daolu_01_hw_dixing_0.geometry
                        }
                        material={materials.hw_dixing_0}
                        position={[0, 0.004, 0]}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_wandaoyou_dimian_01"
                    position={[0, 0, 63000.027]}
                  >
                    <group
                      name="Object_47"
                      position={[0, -0.01, -63000.031]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_wandaoyou_dimian_01_hw_dixing_02_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_wandaoyou_dimian_01_hw_dixing_02_0.geometry
                        }
                        material={materials.hw_dixing_02_0}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_wandaoyou_peijing_01"
                    position={[0, 0, 62999.996]}
                  >
                    <group
                      name="Object_26"
                      position={[0, 0, -0.008]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_wandaoyou_peijing_01_hw_peijing_01_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_wandaoyou_peijing_01_hw_peijing_01_0.geometry
                        }
                        material={materials.hw_peijing_01_2}
                        position={[0, 0.004, 0]}
                      />
                      <mesh
                        name="hw_wandaoyou_peijing_01_hw_peijing_01_0001"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_wandaoyou_peijing_01_hw_peijing_01_0001
                            .geometry
                        }
                        material={materials.hw_peijing_01_2}
                        position={[-5538.124, -4496.546, -3724.88]}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_wandaoyou_peijing_02"
                    position={[0, 0, 62999.996]}
                  >
                    <group
                      name="Object_29"
                      position={[0, 0, -0.008]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_wandaoyou_peijing_02_hw_peijing_02_0"
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
                  <group name="hw_zhidao210_daolu_01">
                    <group name="Object_5" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="hw_zhidao210_daolu_01_hw_dixing_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_daolu_01_hw_dixing_0.geometry
                        }
                        material={materials.hw_dixing}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_zhidao210_daolu_02"
                    position={[0, 0, 20999.998]}
                  >
                    <group
                      name="Object_35"
                      position={[0, 0, 0.002]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_daolu_02_hw_dixing_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_daolu_02_hw_dixing_0.geometry
                        }
                        material={materials.hw_dixing_1}
                        position={[0, 0.002, 0]}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_zhidao210_daolu_03"
                    position={[0, 0, 41999.996]}
                  >
                    <group
                      name="Object_38"
                      position={[0, 0, 0.004]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_daolu_03_hw_dixing_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_daolu_03_hw_dixing_0.geometry
                        }
                        material={materials.hw_dixing_2}
                        position={[0, 0.004, 0]}
                      />
                    </group>
                  </group>
                  <group name="hw_zhidao210_dimian_01">
                    <group name="Object_41" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="hw_zhidao210_dimian_01_hw_dixing_02_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_dimian_01_hw_dixing_02_0.geometry
                        }
                        material={materials.hw_dixing_02}
                      />
                      <mesh
                        name="hw_zhidao210_dimian_01_hw_dixing_02_0001"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_dimian_01_hw_dixing_02_0001
                            .geometry
                        }
                        material={materials.hw_dixing_02}
                        position={[-22868.639, -11873.297, 79.884]}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_zhidao210_dimian_02"
                    position={[0, 0, 20999.98]}
                  >
                    <group
                      name="Object_53"
                      position={[0, -0.003, -20999.979]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_dimian_02_hw_dixing_02_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_dimian_02_hw_dixing_02_0.geometry
                        }
                        material={materials.hw_dixing_02_2}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_zhidao210_dimian_03"
                    position={[0, 0, 41999.996]}
                  >
                    <group
                      name="Object_50"
                      position={[0, -0.007, -41999.863]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_dimian_03_hw_dixing_02_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_dimian_03_hw_dixing_02_0.geometry
                        }
                        material={materials.hw_dixing_02_1}
                      />
                    </group>
                  </group>
                  <group name="hw_zhidao210_peijing_01">
                    <group
                      name="Object_14"
                      position={[0, 0, -0.001]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_peijing_01_hw_peijing_01_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_peijing_01_hw_peijing_01_0.geometry
                        }
                        material={materials.hw_peijing_01}
                      />
                    </group>
                  </group>
                  <group name="hw_zhidao210_peijing_02">
                    <group
                      name="Object_17"
                      position={[0, 0, -0.001]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_peijing_02_hw_peijing_02_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_peijing_02_hw_peijing_02_0.geometry
                        }
                        material={materials.hw_peijing_02_1}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_zhidao210_peijing_03"
                    position={[0, 0, 20999.998]}
                  >
                    <group
                      name="Object_20"
                      position={[0, 0, 0.002]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_peijing_03_hw_peijing_01_0"
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
                  <group
                    name="hw_zhidao210_peijing_04"
                    position={[0, 0, 20999.998]}
                  >
                    <group
                      name="Object_8"
                      position={[0, 0, 0.002]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_peijing_04_hw_peijing_02_0"
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
                  <group
                    name="hw_zhidao210_peijing_05"
                    position={[0, 0, 41999.996]}
                  >
                    <group
                      name="Object_23"
                      position={[0, 0, 0.004]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_peijing_05_hw_peijing_01_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_peijing_05_hw_peijing_01_0.geometry
                        }
                        material={materials.hw_peijing_01_1}
                        position={[0, 0.004, 0]}
                      />
                      <mesh
                        name="hw_zhidao210_peijing_05_hw_peijing_01_0001"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_peijing_05_hw_peijing_01_0001
                            .geometry
                        }
                        material={materials.hw_peijing_01_1}
                        position={[224.264, -583.879, 64.905]}
                      />
                      <mesh
                        name="hw_zhidao210_peijing_05_hw_peijing_01_0002"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.hw_zhidao210_peijing_05_hw_peijing_01_0002
                            .geometry
                        }
                        material={materials.hw_peijing_01_1}
                        position={[-129.22, 614.234, -118.396]}
                      />
                    </group>
                  </group>
                  <group
                    name="hw_zhidao210_peijing_06"
                    position={[0, 0, 41999.996]}
                  >
                    <group
                      name="Object_11"
                      position={[0, 0, 0.004]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="hw_zhidao210_peijing_06_hw_peijing_02_0"
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
                  <group
                    name="Line216"
                    position={[-2935.383, 523.344, 13799.257]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group ref={group}>
            <mesh
              name="PokeBall"
              castShadow
              receiveShadow
              geometry={nodes.PokeBall.geometry}
              material={materials["Material.003"]}
              position={[-1.731, 0.222, 23.97]}
            >
              <Annotation />
            </mesh>
          </group>
          <mesh
            name="Book"
            castShadow
            receiveShadow
            geometry={nodes.Book.geometry}
            material={materials["Material.004"]}
            position={[2.879, 0.812, 50.253]}
          >
            <Sponsor />
          </mesh>
        </group>
        <group>
          <Level3 />
        </group>
      </group>
    </>
  );
}

useGLTF.preload(`${baseImageUrl}/assets/3d/level2-sponsorBook4.glb`);
