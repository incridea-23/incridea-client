import { Html, Plane, useScroll } from "@react-three/drei";
import styles from "./sponsorAnnotation.module.css";
import useStore from "../store/store";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { AddXpDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";

const Sponsor = () => {
  const scroll = useScroll();
  const setSponsorFlag = useStore((state) => state.setSponsor);
  const [scrollData, setScrollData] = useState(false);
  const [calledXp, setCalledXp] = useState(false);
  let scrollChangeFlag = useRef(false);

  const [addXp] = useMutation(AddXpDocument, {
    variables: {
      levelId: "5",
    },
    refetchQueries: ["GetUserXp"],
    awaitRefetchQueries: true,
  });

  const handleAddXp = () => {
    if (calledXp) {
      return;
    }
    setCalledXp(true);
    const promise = addXp().then((res) => {
      if (res.data?.addXP.__typename === "MutationAddXPSuccess") {
        toast.success(
          `Congratulations!!! You have found ${res.data?.addXP.data.level.point} Xp`,
          {
            position: "bottom-center",
            style: {
              backgroundColor: "#7628D0",
              color: "white",
            },
          }
        );
      }
    });
  };

  useFrame(() => {
    if (scrollChangeFlag.current !== scroll.visible(0.774, 0.912)) {
      scrollChangeFlag.current = !scrollChangeFlag.current;
      setScrollData(scrollChangeFlag.current);
    }
  });

  return (
    <group>
      <Html
        transform
        occlude="blending"
        scale={[0.25, -0.25, 0.25]}
        position={[0, -0.08, 0]}
        rotation={[Math.PI, Math.PI / 2 + 0.75, 0]}
        zIndexRange={[0, 50]}
        geometry={
          <Plane args={[5, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial />
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
            handleAddXp();
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
    </group>
  );
};

export default Sponsor;
