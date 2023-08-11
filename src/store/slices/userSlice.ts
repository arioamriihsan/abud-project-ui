import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit';
import { persistUser, readUser } from '@app/services/localStorage.service';
import { UserModel } from '@app/domain/UserModel';
import { Profile } from '@app/api/profile.api';

export interface UserState {
  profile: Profile | null;
}

const initialState: UserState = {
  profile: readUser(),
};

export const setUser = createAction<PrepareAction<UserModel>>('user/setUser', (userData) => {
  persistUser(userData);

  return { payload: userData };
});

export const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
