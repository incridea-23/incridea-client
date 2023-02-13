import jwt from "jsonwebtoken";

export const isJwtExpired = (token: string) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const decoded = jwt.decode(token);

  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      const adjustedExpiry = decoded["exp"] || 0;

      if (adjustedExpiry < currentTime) {
        return true;
      }
      return false;
    }
  }

  return true;
};
