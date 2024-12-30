import { createSlice } from '@reduxjs/toolkit';

interface IOrganizer {
  organizer_id: number;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string;
  organizer_address: string;
  organizer_logo?: string;
  organizer_banner?: string;
  organizer_bio?: string;
  bank_account: {
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
  };
}

const initialOrganizer: IOrganizer = {
  organizer_id: 0,
  organizer_name: '',
  organizer_email: '',
  organizer_phone: '',
  organizer_address: '',
  bank_account: {
    bank_name: '',
    bank_account_name: '',
    bank_account_number: '',
  },
};

const organizerSlicer = createSlice({
  name: 'organizerSlicer',
  initialState: initialOrganizer,
  reducers: {
    setOrganizerData(initialState, action) {
      return { ...action.payload };
    },
    resetOrganizerData(initialState) {
      return initialState;
    },
  },
});

export const { setOrganizerData, resetOrganizerData } = organizerSlicer.actions;
export default organizerSlicer.reducer;
