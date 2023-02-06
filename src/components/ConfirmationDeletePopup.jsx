import React from 'react';
import PopupWithForm from './PopupWithForm';
import { titleTexts } from '../utils/constans';

export default function ConfirmationDeletePopup({
  isOpen,
  onClose,
  buttonText,
  handleDeletedCard,
}) {
  const { textAreYouSure } = titleTexts;
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
