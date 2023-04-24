import { FC } from "react";
import { useQuery } from "@apollo/client";
import { WinnersByEventDocument } from "@/src/generated/generated";

const Winner :FC = () => {
    const {
        data: winnersData,
        loading: winnersLoading,
    } = useQuery(WinnersByEventDocument);

    return <>
        
    </>
}

export default Winner;