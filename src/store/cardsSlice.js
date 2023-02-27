import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import { status } from '../utils/constans';

const { success, error, pending } = status;

const initialState = {
  cardsData: [],
  currentSelectedCard: null,
  cardForImgPopup: null,
  cardsDataStatus: success,
  cardStatus: success,
  cardErrormMessage: '',
  cardsDataErrormMessage: '',
  deleteCardStatus: success,
  deleteCardErrorMessage: '',
  cardTheLikeErrormMessage: '',
};
export const getAllCards = createAsyncThunk(
  'cards/getAllCards',
  async () => await api.getAllCards()
);

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (data) => await api.addCard(data)
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId) => await api.deleteCard(cardId).then(() => cardId)
);

export const likeTheCard = createAsyncThunk(
  'cards/likeTheCard',
  async ({ cardId, isLiked }) => {
    return await api.toggleLike(cardId, isLiked);
  }
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectedCard: (state, action) => ({
      ...state,
      currentSelectedCard: action.payload,
    }),
    selectedCardForImgPopup: (state, action) => ({
      ...state,
      cardForImgPopup: action.payload,
    }),
  },
  extraReducers: {
    [getAllCards.pending]: (state, action) => {
      return {
        ...state,
        cardsDataStatus: pending,
      };
    },
    [getAllCards.fulfilled]: (state, action) => {
      return {
        cardsData: action.payload,
        cardsDataStatus: success,
      };
    },
    [getAllCards.rejected]: (state, action) => {
      return {
        ...state,
        cardsDataStatus: success,
        cardsDataErrormMessage: action.payload,
      };
    },
    [addCard.pending]: (state, action) => {
      return {
        ...state,
        cardStatus: pending,
      };
    },
    [addCard.fulfilled]: (state, action) => {
      return {
        ...state,
        cardStatus: success,
        cardsData: [action.payload, ...state.cardsData],
      };
    },
    [addCard.rejected]: (state, action) => {
      return {
        ...state,
        cardStatus: error,
        cardErrormMessage: action.payload,
      };
    },
    [deleteCard.fulfilled]: (state, action) => {
      return {
        ...state,
        cardsData: state.cardsData.filter(
          (card) => card._id !== action.payload
        ),
        deleteCardStatus: success,
      };
    },
    [deleteCard.pending]: (state, action) => {
      return {
        ...state,
        deleteCardStatus: pending,
      };
    },
    [deleteCard.rejected]: (state, action) => {
      return {
        ...state,
        deleteCardErrorMessage: action.payload,
        deleteCardStatus: error,
      };
    },
    [likeTheCard.fulfilled]: (state, action) => {
      return {
        ...state,
        cardsData: state.cardsData.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    },
    [likeTheCard.rejected]: (state, action) => {
      return {
        ...state,
        cardTheLikeErrormMessage: action.payload,
      };
    },
  },
});
export const { selectedCard, selectedCardForImgPopup } = cardsSlice.actions;

export const selectCardsData = (state) => state.cards.cardsData;
export const selectCardsDataStatus = (state) => state.cards.cardsDataStatus;
export const selectCardsDataErrormMessage = (state) =>
  state.cards.cardsDataErrormMessage;
export const selectCardStatus = (state) => state.cards.cardStatus;
export const selectCardErrorMessage = (state) => state.cards.cardErrormMessage;
export const selectCurrentSelectedCard = (state) =>
  state.cards.currentSelectedCard;
export const selectDeleteCardStatus = (state) => state.cards.deleteCardStatus;
export const selectDeleteCardErrorMessage = (state) =>
  state.cards.deleteCardErrorMessage;
export const selectCardTheLikeErrormMessage = (state) =>
  state.cards.cardTheLikeErrormMessage;
export const selectCardForImgPopup = (state) => state.cards.cardForImgPopup;

export default cardsSlice.reducer;
