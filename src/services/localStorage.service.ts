import { Profile } from '@app/api/profile.api';

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};

export const persistUser = (user: Profile): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUser = (): Profile | null => {
  const userStr = localStorage.getItem('user');

  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
