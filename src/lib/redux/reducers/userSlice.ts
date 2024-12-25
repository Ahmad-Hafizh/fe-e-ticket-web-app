import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

const initalUser: IUser = {
  name: '',
  email: '',
  role: '',
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initalUser,
  reducers: {
    signIn: (initialState, action) => {
      return { ...action.payload };
    },
    signOut: (initialState) => {
      return initialState;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
