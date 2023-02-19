import { NextApiResponse, NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const ACCESS_TOKEN_NAME = 'access_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';

export function setTokenCookie(
  res: NextApiResponse,
  name: string,
  value: string
) {
  const cookieValue = jwt.sign(value, process.env.AUTH_SECRET as string); // sign the token with AUTH_SECRET
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(name, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/',
    })
  );
}

export const getTokenFromCookie = (req: NextApiRequest) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookie.parse(cookieHeader);
  const accessToken = cookies[ACCESS_TOKEN_NAME];
  const refreshToken = cookies[REFRESH_TOKEN_NAME];

  if (accessToken && refreshToken) {
    try {
      const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.AUTH_SECRET as string
      ); // verify the access token with AUTH_SECRET
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.AUTH_SECRET as string
      ); // verify the refresh token with AUTH_SECRET
      return {
        accessToken: decodedAccessToken,
        refreshToken: decodedRefreshToken,
      };
    } catch (error) {
      console.error('Error verifying token', error);
      return null;
    }
  }

  return null;
};
