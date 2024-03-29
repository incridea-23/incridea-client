import { FC } from "react";
import { useQuery } from "@apollo/client";
import { RoundsByEventDocument } from "@/src/generated/generated";

const RoundsDone:FC<
    {
        eventId: string;
    }
> = ( eventId ) => {

    //query to get rounds by event
    const { loading, error, data } = useQuery(RoundsByEventDocument, {
        variables: {
            eventId: eventId.eventId
        }
    });

    let total = data?.roundsByEvent.length, done = 0;

    {!loading && data?.roundsByEvent.map((round) => { //checks if the rounds are completed or not
        round.completed ? done++ : done; 
    }
    )}

    return (<>
        <div className={`flex justify-center items-center ${done===total && done !== 0 ? "border-green-500 text-green-500" : ""}`}>
            {done===total && done !== 0 ? "Event has Ended" : done + " / " + total }
        </div>
    </>
    )
}

export default RoundsDone