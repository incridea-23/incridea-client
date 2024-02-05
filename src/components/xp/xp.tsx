import React from "react";
import { useMutation } from "@apollo/client";
import { AddXpDocument } from "@/src/generated/generated";
import toast from "react-hot-toast";

interface XpProps {
    children: React.ReactNode;
    levelId: string;
}

const Xp = ({ children, levelId }: XpProps) => {
    const [addXp] = useMutation(AddXpDocument,{
        variables: {
            levelId: levelId,
        },
    });

    const handleAddXp = () => {
        console.log("add xp"); 
        const promise = addXp().then((res) => {
            if (res.data?.addXP.__typename !== "MutationAddXPSuccess") {
                toast.error(`Opps!! You have already claimed your xp or not logged in`, {
                    position: "bottom-center",
                    style: {
                        backgroundColor: "#7628D0",
                        color: "white",
                    },
                });
            } else {
                toast.success(`Congratulations!! Added ${res.data?.addXP.data.level.point} Xp`, {
                    position: "bottom-center",
                    style: {
                        backgroundColor: "#7628D0",
                        color: "white",
                    },
                });
            }
        });
    };

    return <div onClick={handleAddXp}>{children}</div>;
};

export default Xp;
