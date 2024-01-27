import { Html, Plane, RoundedBox, useScroll } from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";
import { extend, useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react";
import { geometry } from "maath";
import styles from "./annotation.module.css";
import { editable as e } from "@theatre/r3f";

extend(geometry);

const Annotation = () => {
  const scroll = useScroll();
  const [scrollData, setScrollData] = useState(false);
  let scrollChangeFlag = useRef(false);

  useFrame(() => {
    if (scrollChangeFlag.current !== scroll.visible(0.42, 0.6)) {
      scrollChangeFlag.current = !scrollChangeFlag.current;
      setScrollData(scrollChangeFlag.current);
    }
  });

  return (
    <e.group theatreKey="html">
      <Html
        transform
        occlude="blending"
        scale={0.35}
        position={[0, -0.2, 0]}
        rotation={[0, Math.PI / 4 + 0.5, 0]}
        // distanceFactor={5}
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
        <span
          className={styles.annotation}
          style={{ display: scrollData ? "block" : "none" }}
          onClick={() => console.log("Clicked")}
        >
          Click Here
        </span>
      </Html>
    </e.group>
  );
};

export default Annotation;
