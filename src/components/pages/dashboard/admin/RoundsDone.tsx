import { FC } from "react";
import { useQuery } from "@apollo/client";
import { RoundsByEventDocument } from "@/src/generated/generated";

const RoundsDone:FC<
    {
        eventId: string;
    }
> = ( eventId ) => {

    const { loading, error, data } = useQuery(RoundsByEventDocument, {
        variables: {
            eventId: eventId.eventId
        }
    });

    let total = 0, done = 0;

    return (<>
        {data?.roundsByEvent.map((round) => {
            round.completed ? done++ : total++;
        }
        )}
        <div className={`flex justify-center items-center ${done===total ? "border-green-500 text-green-500" : ""}`}>
            {done===total ? "Event has Ended" : done + " / " + total }
        </div>
    </>
    )
}

export default RoundsDone