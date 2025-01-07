import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import organizerReducer from './reducers/organizerSlice';
import profileReducer from './reducers/profileSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      organizerReducer,
      profileReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
