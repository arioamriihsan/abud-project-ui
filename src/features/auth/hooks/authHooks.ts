import { useMutation } from 'react-query';
import { httpApi } from '@app/api/http.api';
import { LoginRequest, postLogin, postLogout } from '@app/api/auth.api';
import { persistToken } from '@app/services/localStorage.service';

export const usePostLogin = () => {
  return useMutation((param: LoginRequest) => postLogin(param), {
    onSuccess: (data) => {
      const accessToken = data?.data?.access_token || '';

      if (!!accessToken) {
        persistToken(accessToken);
        httpApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
    },
  });
};

export const usePostLogout = () => {
  return useMutation(({ username }: { username: string }) => postLogout({ username }));
};
