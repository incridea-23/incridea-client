import jwt from "jsonwebtoken";

export const isJwtExpired = (token: string) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const decoded = jwt.decode(token);
  console.log("decoded", decoded);

  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      const adjustedExpiry = decoded["exp"] || 0;

      if (adjustedExpiry < currentTime) {
        console.log("token expired");
        return true;
      }
      console.log(
        "time remaining",
        (adjustedExpiry - currentTime) / 60,
        "minutes"
      );
      console.log("token not expired");
      return false;
    }
  }

  return true;
};
