export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};
//
export const baseImageUrl =
  "https://res.cloudinary.com/dg1941jdi/image/upload/v1707625400/";
// export const baseImageUrl = "/";

export const baseAudioUrl =
  "https://res.cloudinary.com/dg1941jdi/video/upload/v1707622300/";
