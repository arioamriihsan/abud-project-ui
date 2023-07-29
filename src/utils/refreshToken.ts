import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import { httpPublic } from '@app/api/http.api';
import { persistToken } from '@app/services/localStorage.service';

export interface JwttToken {
  /** audience, who or what the token is itended for */
  aud: string;
  /** expired in unix value */
  exp: number;
  /** when token issued */
  iat: number;
  /** who create and signed the JWT */
  iss: string;
  /** JWT Unique identifier */
  jti: string;
  /** type token ex: access_token */
  type: string;
  user: {
    /** userid belonging to the token */
    id: number;
  };
  amr?: string[];
  scope?: string;
}

interface RefreshTokenResponse {
  access_token: string;
  error: boolean;
}

export const checkTokenExpiration = (token: string) => {
  if (!token) return;

  let decodedJwt: JwttToken | undefined;

  try {
    decodedJwt = jwtDecode<JwttToken>(token);
  } catch (error) {}

  if (!decodedJwt) return;

  const expiryToken = decodedJwt.exp;
  const expiredToken = dayjs.unix(expiryToken).diff(dayjs()) < 1;

  return expiredToken;
};

export const doRefreshToken = async (): Promise<string> => {
  const resp = await httpPublic.get<RefreshTokenResponse>('auth/token', {
    headers: { language: localStorage.getItem('lng') || 'id' },
  });
  persistToken(resp?.data?.access_token);

  return resp?.data?.access_token;
};
