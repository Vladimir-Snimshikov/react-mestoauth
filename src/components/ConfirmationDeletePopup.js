import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmationDeletePopup({
  isOpen,
  onClose,
  buttonText,
  handleDeletedCard,
}) {
  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeletedCard}
    ></PopupWithForm>
  );
}
