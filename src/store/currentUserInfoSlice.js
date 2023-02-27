import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const initialState = {
  userInfo: {},
  userInfoStatus: 'success',
  userInfoErrorMessage: '',
  userUpdateInfoStatus: 'success',
  userInfoUpdateErrorMessage: '',
  userInfoUpdateAvatarStatus: 'success',
  userInfoUpdateAvatarErrorMessage: '',
};
export const getUserInfo = createAsyncThunk(
  'currentUser/getUserInfo',
  async () => await api.getUserInfo()
);

export const editUserInfo = createAsyncThunk(
  'currentUser/editUserInfo',
  async ({ name, about }) => await api.editProfile({ name, about })
);

export const editUserInfoAvatar = createAsyncThunk(
  'currentUser/editUserInfoAvatar',
  async ({ avatar }) => await api.putAvatar({ avatar })
);

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    selectedCard: (state, action) => ({}),
  },
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
        userInfoStatus: 'success',
      };
    },
    [getUserInfo.pending]: (state, action) => {
      return {
        ...state,
        userInfoStatus: 'pending',
      };
    },
    [getUserInfo.rejected]: (state, action) => {
      return {
        ...state,
        userInfoStatus: 'error',
        userInfoErrorMessage: action.payload,
      };
    },
    [editUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
        userUpdateInfoStatus: 'success',
      };
    },
    [editUserInfo.pending]: (state, action) => {
      return {
        ...state,
        userUpdateInfoStatus: 'pending',
      };
    },
    [editUserInfo.rejected]: (state, action) => {
      return {
        ...state,
        userUpdateInfoStatus: 'error',
        userInfoUpdateErrorMessage: action.payload,
      };
    },

    [editUserInfoAvatar.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
        userInfoUpdateAvatarStatus: 'success',
      };
    },
    [editUserInfoAvatar.pending]: (state, action) => {
      return {
        ...state,
        userInfoUpdateAvatarStatus: 'pending',
      };
    },
    [editUserInfoAvatar.rejected]: (state, action) => {
      return {
        ...state,
        userInfoUpdateAvatarStatus: 'error',
        userInfoUpdateAvatarErrorMessage: action.payload,
      };
    },
  },
});
/* export const { selectedCard, selectedCardForImgPopup } = cardsSlice.actions; */

export const selectUserInfo = (state) => state.currentUser.userInfo;
export const selectUserUpdateInfoStatus = (state) =>
  state.currentUser.userUpdateInfoStatus;
export const selectUserUpdateInfoErrorMessage = (state) =>
  state.currentUser.userInfoUpdateErrorMessage;

export const selectUserInfoUpdateAvatarStatus = (state) =>
  state.currentUser.userInfoUpdateAvatarStatus;
export const selectUserInfoUpdateAvatarErrorMessage = (state) =>
  state.currentUser.userInfoUpdateAvatarErrorMessage;

export default currentUserSlice.reducer;
