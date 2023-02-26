import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { titleTexts } from '../utils/constans';
import {
  deleteCard,
  selectCurrentSelectedCard,
  selectDeleteCardStatus,
  selectDeleteCardErrorMessage,
} from '../store/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllPopup } from '../store/popupSlice';
export default function ConfirmationDeletePopup({ isOpen, onClose }) {
  const [buttonText, setbuttonText] = useState('Да');

  const { textAreYouSure } = titleTexts;
  const dispatch = useDispatch();
  const currentCard = useSelector(selectCurrentSelectedCard);
  const deleteCardStatus = useSelector(selectDeleteCardStatus);
  const deleteCardErrorMessage = useSelector(selectDeleteCardErrorMessage);

  useEffect(() => {
    if (deleteCardStatus === 'pending') {
      setbuttonText('Удаление...');
    }
    if (deleteCardStatus === 'success') {
      dispatch(closeAllPopup());
      setbuttonText('Да');
    }
    if (deleteCardStatus === 'error') {
      console.log(deleteCardErrorMessage);
    }
  }, [deleteCardStatus]);

  function handleDeletedCard(e) {
    e.preventDefault();

    dispatch(deleteCard(currentCard._id));
  }
  return (
    <PopupWithForm
      name="confirmation"
      title={textAreYouSure}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeletedCard}
    ></PopupWithForm>
  );
}
