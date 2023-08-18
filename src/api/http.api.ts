import axios from 'axios';
import { AxiosError } from 'axios';
import { queryClient } from 'core/queryClient';
import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';
import { checkTokenExpiration, doRefreshToken } from '@app/utils/refreshToken';

export const httpPublic = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // for cookies
  headers: { Authorization: 'Bearer' },
});

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

httpApi.interceptors.request.use(
  async (config) => {
    let token = readToken();

    const expiredToken = checkTokenExpiration(token);
    if (expiredToken) {
      token = await doRefreshToken();
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      language: localStorage.getItem('lng') || 'id',
    };

    return config;
  },
  (err) => Promise.reject(err),
);

httpApi.interceptors.response.use(undefined, (err: AxiosError) => {
  const errStatus = err?.response?.status;

  if (!!errStatus && [401, 403].includes(errStatus)) {
    queryClient.setQueryData('Force Logout', true);
  }
  throw new ApiError<ApiErrorData>(err.response?.data.message || err.message, err.response?.data);
});

export interface ApiErrorData {
  message: string;
}
