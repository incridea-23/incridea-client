import { NextApiRequest, NextApiResponse } from 'next';
import {
  setTokenCookie,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from '../../../utils/auth-helper';

export default function Login(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, refreshToken } = req.body;

  // Set the access token cookie
  setTokenCookie(res, ACCESS_TOKEN_NAME, accessToken, 15 * 60);

  // Set the refresh token cookie
  setTokenCookie(res, REFRESH_TOKEN_NAME, refreshToken, 7 * 24 * 60 * 60);

  res.status(200).json({
    message: 'Login successful',
  });
}
