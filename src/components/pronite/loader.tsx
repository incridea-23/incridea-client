import { baseImageUrl } from "@/src/utils/url";
import Image from "next/image";

export default function Loader({ loading }: { loading: boolean }) {
  return (
    <div
      className="fixed text-white inset-0 z-[100] flex-col bg-black flex justify-center items-center"
      style={{
        opacity: loading ? 1 : 0,
        transition: "opacity 1.5s",
        pointerEvents: loading ? "auto" : "none",
      }}
    >
      <Image
        src={`${baseImageUrl}/assets/loader/dodLogo.png`}
        alt=""
        height={180}
        width={180}
        className="opacity-80 animate-pulse"
      />
    </div>
  );
}
