import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit';
import { persistUser, readUser } from '@app/services/localStorage.service';
import { UserModel } from '@app/domain/UserModel';

export interface UserState {
  profile: UserModel | null;
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
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
