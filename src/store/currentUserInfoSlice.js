import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import { status } from '../utils/constans';

const { success, error, pending } = status;

const initialState = {
  userInfo: {},
  userInfoStatus: success,
  userInfoErrorMessage: '',
  userUpdateInfoStatus: success,
  userInfoUpdateErrorMessage: '',
  userInfoUpdateAvatarStatus: success,
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
    addEmail: (state, action) => {
      return {
        ...state,
        userInfo: { ...state.userInfouse, email: action.payload },
      };
    },
  },
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
        userInfoStatus: success,
      };
    },
    [getUserInfo.pending]: (state, action) => {
      return {
        ...state,
        userInfoStatus: pending,
      };
    },
    [getUserInfo.rejected]: (state, action) => {
      return {
        ...state,
        userInfoStatus: error,
        userInfoErrorMessage: action.payload,
      };
    },
    [editUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
        userUpdateInfoStatus: success,
      };
    },
    [editUserInfo.pending]: (state, action) => {
      return {
        ...state,
        userUpdateInfoStatus: pending,
      };
    },
    [editUserInfo.rejected]: (state, action) => {
      return {
        ...state,
        userUpdateInfoStatus: error,
        userInfoUpdateErrorMessage: action.payload,
      };
    },

    [editUserInfoAvatar.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
        userInfoUpdateAvatarStatus: success,
      };
    },
    [editUserInfoAvatar.pending]: (state, action) => {
      return {
        ...state,
        userInfoUpdateAvatarStatus: pending,
      };
    },
    [editUserInfoAvatar.rejected]: (state, action) => {
      return {
        ...state,
        userInfoUpdateAvatarStatus: error,
        userInfoUpdateAvatarErrorMessage: action.payload,
      };
    },
  },
});

export const { addEmail } = currentUserSlice.actions;

export const selectUserInfo = (state) => state.currentUser.userInfo;
export const selectUserInfoStatus = (state) => state.currentUser.userInfoStatus;
export const selectUserInfoErrorMessage = (state) =>
  state.currentUser.userInfoErrorMessage;
export const selectUserUpdateInfoStatus = (state) =>
  state.currentUser.userUpdateInfoStatus;
export const selectUserUpdateInfoErrorMessage = (state) =>
  state.currentUser.userInfoUpdateErrorMessage;

export const selectUserInfoUpdateAvatarStatus = (state) =>
  state.currentUser.userInfoUpdateAvatarStatus;
export const selectUserInfoUpdateAvatarErrorMessage = (state) =>
  state.currentUser.userInfoUpdateAvatarErrorMessage;

export default currentUserSlice.reducer;
