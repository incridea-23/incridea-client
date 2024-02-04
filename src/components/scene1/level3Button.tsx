import { Html, Plane, useScroll } from "@react-three/drei";
import styles from "./eventAnnotation.module.css";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Link from "next/link";

const Level3 = () => {
  const scroll = useScroll();
  const [scrollData, setScrollData] = useState(false);
  const scrollChangeFlag = useRef(false);

  useFrame(() => {
    if (scrollChangeFlag.current !== scroll.visible(0.865, 1)) {
      // console.log(scrollChangeFlag.current);
      scrollChangeFlag.current = !scrollChangeFlag.current;
      setScrollData(scrollChangeFlag.current);
    }
    // console.log(scroll.offset);
  });

  return (
    <Html
      transform
      occlude="blending"
      scale={1.25}
      position={[0, 1, 64.25]}
      rotation={[0, Math.PI, 0]}
      wrapperClass={styles.annotationContainer}
      zIndexRange={[0, 50]}
      geometry={
        <Plane args={[0.175, 0.175]} position={[0, 0.05, 0.2]}>
          <meshStandardMaterial color={"black"} transparent opacity={0} />
        </Plane>
      }
      center
      portal={{ current: scroll.fixed }}
    >
      <div
        style={{
          // paddingTop: "25px",
          borderRadius: "99px",
          width: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log("Clicked");
        }}
      >
        <Link href={"/explore/level3"}>
          <span
            className={styles.levelButton}
            style={{
              opacity: scrollData ? 1 : 0,
              pointerEvents: scrollData ? "all" : "none",
            }}
          >
            Enter level 3
          </span>
        </Link>
      </div>
    </Html>
  );
};

export default Level3;
