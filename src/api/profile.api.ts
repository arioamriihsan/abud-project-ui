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
  status: number;
  has_changed_password: number;
  role: number;
  last_updated: string;
}

const endpoints = {
  user: '/user',
};

export const getProfile = () => {
  return httpApi.get<AxiosResponse<Profile>>(endpoints.user);
};
