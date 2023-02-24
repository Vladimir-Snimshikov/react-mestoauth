import { configureStore } from '@reduxjs/toolkit';
import popupReducers from './popupSlice';

export const store = configureStore({
  reducer: {
    popups: popupReducers,
  },
});
