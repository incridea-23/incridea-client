import { Html, Plane, useScroll } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";
import styles from "./sponsorAnnotation.module.css";
import useStore from "../store/store";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Sponsor = () => {
  const scroll = useScroll();
  const setSponsorFlag = useStore((state) => state.setSponsor);
  const [scrollData, setScrollData] = useState(false);
  let scrollChangeFlag = useRef(false);
  // const sponsor = useStore((state) => state.sponsor);

  useFrame(() => {
    // console.log(scroll.offset);
    if (scrollChangeFlag.current !== scroll.visible(0.7953, 0.912)) {
      scrollChangeFlag.current = !scrollChangeFlag.current;
      setScrollData(scrollChangeFlag.current);
    }
  });

  return (
    <e.group theatreKey={`Sponsor`}>
      <Html
        transform
        occlude="blending"
        scale={[0.25, -0.25, 0.25]}
        position={[0, -0.08, 0]}
        rotation={[Math.PI, Math.PI / 2 + 0.75, 0]}
        zIndexRange={[0, 50]}
        geometry={
          <Plane args={[5, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial
            // color={"white"}
            // transparent opacity={0}
            />
          </Plane>
        }
        center
        portal={{ current: scroll.fixed }}
      >
        <div
          className={styles.annotationContainer}
          onClick={() => {
            setSponsorFlag();
            console.log("Clicked");
          }}
        >
          <div
            style={{
              opacity: scrollData ? 1 : 0,
              visibility: scrollData ? "visible" : "hidden",
            }}
            className={styles.annotation}
          >
            Sponsor
          </div>
        </div>
      </Html>
    </e.group>
  );
};

export default Sponsor;
