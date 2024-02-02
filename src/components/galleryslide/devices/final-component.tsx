import { AddXpDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const FinalComponent = () => {
  const [addXp] = useMutation(AddXpDocument, {
    variables: {
      levelId: "1",
    },
  });

  const handleAddXp = () => {
    const promise = addXp().then((res) => {
      if (res.data?.addXP.__typename !== "MutationAddXPSuccess") {
        toast.error(
          `Opps!! You have already claimed your xp or not logged in`,
          {
            position: "bottom-center",
          }
        );
      } else {
        toast.success(`Added ${res.data?.addXP.data.level.point} Xp`, {
          position: "bottom-center",
        });
      }
    });
  };
  return (
    <div
      className="w-full text-white flex flex-col items-center font-VikingHell"
      id="animation"
    >
      <h1 className="font-bold text-4xl md:text-6xl tracking-widest">
        Incridea 24`
      </h1>
      ;
      <p className="text-sm md:text-lg tracking-wider">
        Its your time to create great memories
      </p>
      <Image
        src={"/assets/png/dice.png"}
        alt="dice"
        width={50}
        height={50}
        className="origin-center mt-4 cursor-pointer hover:animate-shake"
        onClick={() => {}}
      ></Image>
    </div>
  );
};

export default FinalComponent;
