/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface IProfile {
  social_medias?: any[];
  address?: string;
  city?: string;
  country?: string;
  zipcode?: string;
  birth_date?: string;
  gender?: string;
}

const initialProfile: IProfile = {
  social_medias: [],
  address: '',
  city: '',
  country: '',
  zipcode: '',
  birth_date: '',
  gender: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfile,
  reducers: {
    addProfile: (initialState, action) => {
      return { ...action.payload };
    },
    resetProfile: (initialState) => {
      return initialState;
    },
  },
});

export const { addProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
