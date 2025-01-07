import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  pfp_url: any;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isVerified: boolean;
}

const initalUser: IUser = {
  name: '',
  email: '',
  role: '',
  isVerified: false,
  phone: '',
  pfp_url: '',
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
