import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ResetPasswordRequest,
  signUp,
  SignUpRequest,
  resetPassword,
  verifySecurityCode,
  SecurityCodePayload,
  NewPasswordData,
  setNewPassword,
  logout,
} from '@app/api/auth.api';
import { setUser } from '@app/store/slices/userSlice';
import { deleteToken, deleteUser } from '@app/services/localStorage.service';
import { notificationController } from '@app/controllers/notificationController';

export interface AuthSlice {
  token: string | null;
}

export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>
  signUp(signUpPayload),
);

export const doResetPassword = createAsyncThunk(
  'auth/doResetPassword',
  async (resetPassPayload: ResetPasswordRequest) => resetPassword(resetPassPayload),
);

export const doVerifySecurityCode = createAsyncThunk(
  'auth/doVerifySecurityCode',
  async (securityCodePayload: SecurityCodePayload) => verifySecurityCode(securityCodePayload),
);

export const doSetNewPassword = createAsyncThunk('auth/doSetNewPassword', async (newPasswordData: NewPasswordData) =>
  setNewPassword(newPasswordData),
);

export const doLogout = createAsyncThunk('auth/doLogout', async (payload, { dispatch }) => {
  logout()
    .then()
    .catch((e) => notificationController.error({ message: e.message }))
    .finally(() => {
      deleteToken();
      deleteUser();
      dispatch(setUser(null));
    });
});
