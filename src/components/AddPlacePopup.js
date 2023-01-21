import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

export default function AddPlacePopup({
  onAddPlace,
  isOpen,
  onClose,
  buttonText,
}) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();
  const [validationMessageCardName, setValidationMessageCardName] =
    useState('');
  const [validationMessageCardLink, setValidationMessageCardLink] =
    useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
    cardLinkRef.current.value = '';
    cardNameRef.current.value = '';
  }

  function handleChangeCardLink(e) {
    setValidationMessageCardLink(e.target.validationMessage);
  }

  function handleChangeCardName(e) {
    setValidationMessageCardName(e.target.validationMessage);
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={
        (validationMessageCardLink === '') & (validationMessageCardName === '')
          ? false
          : true
      }
    >
      <input
        ref={cardNameRef}
        id="imgName-input"
        type="text"
        name="name"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeCardName}
      />
      <span className="popup__input-span popup__input-span_type_error">
        {validationMessageCardName}
      </span>
      <input
        ref={cardLinkRef}
        id="url-input"
        type="url"
        name="link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeCardLink}
      />
      <span className="popup__input-span popup__input-span_type_error">
        {validationMessageCardLink}
      </span>
    </PopupWithForm>
  );
}
