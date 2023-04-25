export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};

export const baseImageUrl = "https://res.cloudinary.com/drzra1b9g/image/upload/v1681720160";

