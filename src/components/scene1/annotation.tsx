import { Html, Plane, RoundedBox, useScroll } from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";
import { extend, useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react";
import { geometry } from "maath";
import styles from "./eventAnnotation.module.css";
import useStore from "../store/store";

extend(geometry);

const Annotation = () => {
  const scroll = useScroll();
  const [scrollData, setScrollData] = useState(false);
  let scrollChangeFlag = useRef(false);
  const setEventDexFlag = useStore((state) => state.setEventDex);

  useFrame(() => {
    if (scrollChangeFlag.current !== scroll.visible(0.35, 0.6)) {
      scrollChangeFlag.current = !scrollChangeFlag.current;
      setScrollData(scrollChangeFlag.current);
    }
  });

  return (
    <Html
      transform
      occlude="blending"
      scale={0.35}
      position={[0, 0.1, 0]}
      rotation={[0, Math.PI / 4 + 0.5, 0]}
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
          paddingTop: "25px",
          borderRadius: "99px",
          width: "45px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          setEventDexFlag();
        }}
      >
        <span
          className={styles.annotation}
          style={{ display: scrollData ? "block" : "none" }}
        >
          Click Here
        </span>
      </div>
    </Html>
  );
};

export default Annotation;
