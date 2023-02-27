import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openedPopupName: '',
};

export const popupSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    openPopup: (state, action) => ({
      ...state,
      openedPopupName: action.payload,
    }),
    closeAllPopup: (state) => ({ ...state, openedPopupName: '' }),
  },
});

export const { openPopup, closeAllPopup } = popupSlice.actions;

export const selectPopupName = (state) => state.popups.openedPopupName;

export default popupSlice.reducer;
