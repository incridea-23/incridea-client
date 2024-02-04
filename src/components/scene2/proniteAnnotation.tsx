import { Html, Plane, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import styles from "./annotation.module.css";
import Link from "next/link";

import studio from "@theatre/studio";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import extension from "@theatre/r3f/dist/extension";

// studio.extend(extension);
// studio.initialize();

// const demoSheet = getProject("Scene 1").sheet("Scene 1");

export default function ProniteAnnotation() {
  const scroll = useScroll();
  const [scrollData, setScrollData] = useState(false);
  let scrollChangeFlag = useRef(false);

  useFrame(() => {
    console.log(scroll.offset);
    if (scrollChangeFlag.current !== scroll.visible(0.22, 0.435)) {
      scrollChangeFlag.current = !scrollChangeFlag.current;
      setScrollData(scrollChangeFlag.current);
    }
  });

  return (
    // <SheetProvider sheet={demoSheet}>
    <group
      // theatreKey="group"
      rotation={[0, -Math.PI / 2, 0]}
      position={[4, 1.2, 1]}
    >
      <Html
        transform
        occlude="blending"
        scale={[0.5, -0.5, 0.5]}
        rotation={[Math.PI, 0, 0]}
        zIndexRange={[0, 50]}
        geometry={
          <Plane args={[1, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color={"black"} transparent opacity={0} />
          </Plane>
        }
        center
        portal={{ current: scroll.fixed }}
      >
        <Link
          href="/pronites"
          className={styles.annotationContainer}
          onClick={() => {
            console.log("Clicked");
          }}
        >
          <div
            style={{
              opacity: scrollData ? 1 : 0,
              pointerEvents: scrollData ? "auto" : "none",
            }}
            className={styles.annotation}
          >
            Sponsor
          </div>
        </Link>
      </Html>
    </group>
    // </SheetProvider>
  );
}
