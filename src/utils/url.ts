export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};
//
export const baseImageUrl = "https://res.cloudinary.com/dg1941jdi/image/upload/v1707154387/";
// export const baseImageUrl = "/";
