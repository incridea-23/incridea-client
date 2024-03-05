export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};
//
export const baseImageUrl =
  "https://res.cloudinary.com/daufwc1ph/image/upload/v1709646134/";
// export const baseImageUrl = "/";

export const baseAudioUrl =
  "https://res.cloudinary.com/daufwc1ph/image/upload/v1709646134/";
