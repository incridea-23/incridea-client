export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};
