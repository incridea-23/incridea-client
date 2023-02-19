import { NextApiRequest, NextApiResponse } from 'next';
import {
  setTokenCookie,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from './constants';

export default function Login(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, refreshToken } = req.body;

  // Set the access token cookie
  setTokenCookie(res, ACCESS_TOKEN_NAME, accessToken);

  // Set the refresh token cookie
  setTokenCookie(res, REFRESH_TOKEN_NAME, refreshToken);

  res.status(200).json({ success: true });
}
