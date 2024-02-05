export const generateEventUrl = (eventName: string, eventID: string) => {
  return `/event/${eventName.toLowerCase().replaceAll(" ", "-")}-${eventID}`;
};
//
export const baseImageUrl = "https://res.cloudinary.com/dgmbkupp8/image/upload/v1705931309/";
// export const baseImageUrl = "/";
