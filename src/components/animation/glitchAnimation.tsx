import styles from "./glitch.module.css";
import { pressStart } from "@/src/pages/_app";
interface glitchProps {
  text: string;
}
export default function GlitchAnimation({ text }: glitchProps) {
  return (
    <>
      <p
        className={`${styles.glitch} lg:text-3xl md:text-2xl sm:text-lg text-md`}
      >
        <span aria-hidden="true">{text}</span>
        {text}
        <span aria-hidden="true">{text}</span>
      </p>
    </>
  );
}
