import { BsCalendar2Check } from 'react-icons/bs';

const GoogleCalendar = () => {
  // const config = {
  //   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   discoveryDocs: [
  //     'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  //   ],
  //   // Authorization scopes required by the API; multiple scopes can be
  //   // included, separated by spaces.
  //   scope:
  //     'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar',
  // };

  return (
    <>
      <button
        // onClick={addEvent}
        className="flex items-center justify-center gap-2 bg-black/30 font-semibold hover:bg-black/50 text-blue-300 text-bold rounded-md p-2 cursor-pointer text-sm"
      >
        <BsCalendar2Check /> Add to Calender
      </button>
    </>
  );
};

export default GoogleCalendar;
