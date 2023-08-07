import { AxiosResponse } from 'axios';
import { httpApi } from '@app/api/http.api';

export interface Profile {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string | number;
  date_of_birth: string;
  background_color: string;
  status: 0 | 1;
  has_changed_password: 0 | 1;
  role: number;
  last_updated: string;
}

const endpoints = {
  user: '/user',
};

export const getProfile = () => {
  return httpApi.get<AxiosResponse<Profile>>(endpoints.user);
};
