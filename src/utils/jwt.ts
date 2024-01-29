import jwt from "jsonwebtoken";

export const isJwtExpired = (token: string) => {
  const currentTime = Math.floor(Date.now() / 1000) + 60;
  const decoded = jwt.decode(token);

  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      const adjustedExpiry = decoded["exp"] || 0;
      const remaining = adjustedExpiry - currentTime;
      if (adjustedExpiry < currentTime) {
        return true;
      }
      return false;
    }
  }

  return true;
};

export const getRefreshTokenExpiry = (token: string) => {
  const decoded = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      const adjustedExpiry = decoded["exp"] || 0;
      // console.log("Refresh :", (adjustedExpiry - currentTime).toLocaleString());
      return adjustedExpiry;
    }
  }
  return 0;
};
