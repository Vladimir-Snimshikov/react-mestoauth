import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

const initialState = {
  cardsData: [],
  currentSelectedCard: null,
  cardsDataStatus: 'success',
  cardStatus: 'success',
  cardErrormMessage: '',
  cardsDataErrormMessage: '',
  deleteCardStatus: 'success',
  deleteCardErrorMessage: '',
};
export const getAllCards = createAsyncThunk(
  'cards/getAllCards',
  async () => await api.getAllCards()
);

export const toggleLikeCard = createAsyncThunk(
  'cards/toggleLikeCard',
  async (cardId, isLiked) => await api.toggleLike(cardId, isLiked)
);

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (data) => await api.addCard(data)
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId) => await api.deleteCard(cardId).then(() => cardId)
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectedCard: (state, action) => ({
      ...state,
      currentSelectedCard: action.payload,
    }),
  },
  extraReducers: {
    [getAllCards.pending]: (state, action) => {
      return {
        ...state,
        cardsDataStatus: 'loading',
      };
    },
    [getAllCards.fulfilled]: (state, action) => {
      return {
        cardsData: action.payload,
        cardsDataStatus: 'success',
      };
    },
    [getAllCards.rejected]: (state, action) => {
      return {
        ...state,
        cardsDataStatus: 'success',
        cardsDataErrormMessage: action.payload,
      };
    },
    [addCard.pending]: (state, action) => {
      return {
        ...state,
        cardStatus: 'loading',
      };
    },
    [addCard.fulfilled]: (state, action) => {
      return {
        ...state,
        cardStatus: 'success',
        cardsData: [action.payload, ...state.cardsData],
      };
    },
    [addCard.rejected]: (state, action) => {
      return {
        ...state,
        cardStatus: 'error',
        cardErrormMessage: action.payload,
      };
    },
    [deleteCard.fulfilled]: (state, action) => {
      console.log('act', action);
      return {
        ...state,
        cardsData: state.cardsData.filter(
          (card) => card._id !== action.payload
        ),
        deleteCardStatus: 'success',
      };
    },
    [deleteCard.pending]: (state, action) => {
      return {
        ...state,
        deleteCardStatus: 'pending',
      };
    },
    [deleteCard.rejected]: (state, action) => {
      return {
        ...state,
        deleteCardErrorMessage: action.payload,
        deleteCardStatus: 'error',
      };
    },
  },
});
export const { selectedCard } = cardsSlice.actions;
export const selectCards = (state) => state.cards.cardsData;
export const selectCardsStatus = (state) => state.cards.cardsDataStatus;
export const selectCardStatus = (state) => state.cards.cardStatus;
export const selectCardErrorMessage = (state) => state.cards.cardErrormMessage;
export const currentSelectedCard = (state) => state.cards.currentSelectedCard;
export const selectDeleteCardStatus = (state) => state.cards.deleteCardStatus;
export const selectDeleteCardErrorMessage = (state) =>
  state.cards.deleteCardErrorMessage;

export default cardsSlice.reducer;
