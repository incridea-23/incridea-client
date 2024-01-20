export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};
//"https://res.cloudinary.com/drzra1b9g/image/upload/v1681720160";
export const baseImageUrl = "http://res.cloudinary.com/dehtrfdja/image/upload";
