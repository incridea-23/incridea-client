import { FC }  from 'react';

interface Event {
    id : string;
    description : string;
    eventType : string;
    fees : number;
    image : string;
    maxTeamSize : number;
    maxTeams : number;
    minTeamSize : number;
    name : string;
    published : boolean;
    venue : string;
    rounds : {
      roundNo : number;
      date : string;
      completed : boolean;
      judges : {
        user : {
          name : string;
        }
      }
    }
    branch  : {
      name : string;
      id : string;
    }
    organizers : {
      user : {
        name : string;
        email : string;
        phoneNumber : string;
        createdAt : string;
        id : string;
        isVerified : boolean;
        role : string;
      }
    }
}   



const EventCard: FC<
{
    eventId: string;
}
> = ({ eventId }) => {
    return (
        <div className="flex flex-col justify-center items-center rounded-2xl shadow-lg">
            
        </div>
    );
};


export default EventCard