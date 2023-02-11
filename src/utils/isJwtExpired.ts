import jwt from "jsonwebtoken";

export const isJwtExpired = (token: string) => {
  // offset by 60 seconds, so we will check if the token is "almost expired".
  const currentTime = Math.round(Date.now() / 1000 + 60);
  const decoded = jwt.decode(token);

  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      // console.log("Token['exp'] exists", decodedToken.exp);
      const adjustedExpiry = decoded["exp"] || 0;

      if (adjustedExpiry < currentTime) {
        // console.log("Token expired");
        return true;
      }

      // console.log("Token has not expired yet");
      return false;
    }
  }

  // console.log('Token["exp"] does not exist');
  return true;
};