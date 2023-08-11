import { httpApi, httpPublic } from '@app/api/http.api';

export interface AuthData {
  username: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  error: boolean;
}

interface LogoutResponse {
  message: string;
  error: boolean;
}

const endpoints = {
  login: '/auth/login',
  logout: '/auth/logout',
  changePassword: '/change-password',
};

export const login = async (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>('auth/login', { ...loginPayload }).then(({ data }) => data);

export const logout = async (): Promise<LogoutResponse> =>
  httpPublic.delete<LogoutResponse>('auth/logout').then(({ data }) => data);

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('signUp', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);

export const postLogin = (payload: LoginRequest) => {
  const { username, password } = payload;
  return httpApi.post<LoginResponse>(endpoints.login, {
    username,
    password,
  });
};

export const postLogout = ({ username }: { username: string }) => {
  return httpPublic.post<LogoutResponse>(endpoints.logout, { username });
};

export const changePassword = () => {
  // return httpApi.post(endpoints.changePassword)
};
