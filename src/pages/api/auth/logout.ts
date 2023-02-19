import { NextApiRequest, NextApiResponse } from 'next';
import {
  setTokenCookie,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from './constants';

export default function Logout(req: NextApiRequest, res: NextApiResponse) {
  // Clear the access token cookie
  setTokenCookie(res, ACCESS_TOKEN_NAME, '');

  // Clear the refresh token cookie
  setTokenCookie(res, REFRESH_TOKEN_NAME, '');

  res.status(200).json({ success: true });
}
