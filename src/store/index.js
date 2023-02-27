import { configureStore } from '@reduxjs/toolkit';
import cardsReducers from './cardsSlice';
import popupReducers from './popupSlice';
import currentUserReducers from './currentUserInfoSlice';

export const store = configureStore({
  reducer: {
    popups: popupReducers,
    cards: cardsReducers,
    currentUser: currentUserReducers,
  },
});
