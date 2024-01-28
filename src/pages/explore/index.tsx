// import ExploreGame from "@/src/components/exploreGame";
import dynamic from "next/dynamic";
const ExploreGame = dynamic(() => import("@/src/components/exploreGame/"), {
  ssr: false,
});

export default function Explore() {
  return <ExploreGame />;
}
