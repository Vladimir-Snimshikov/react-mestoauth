import { configureStore } from '@reduxjs/toolkit';
import cardsReducers from './cardsSlice';
import popupReducers from './popupSlice';

export const store = configureStore({
  reducer: {
    popups: popupReducers,
    cards: cardsReducers,
  },
});
