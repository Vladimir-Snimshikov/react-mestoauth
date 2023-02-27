import React from 'react';
import { elemClasses } from '../utils/constans';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../store/cardsSlice';
import { closeAllPopup } from '../store/popupSlice.js';
import { selectCardStatus, selectCardErrorMessage } from '../store/cardsSlice';
import { status, saveButtonText } from '../utils/constans';

const { textToCreate, textConservation } = saveButtonText;
const { success, error, pending } = status;
const { popupInput, popupInputSpan, popupInputSpanTypeError } = elemClasses;

export default function AddPlacePopup({ isOpen, onClose }) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();
  const [validationMessageCardName, setValidationMessageCardName] =
    useState('');
  const [validationMessageCardLink, setValidationMessageCardLink] =
    useState('');
  const [buttonText, setButtonText] = useState(textToCreate);

  const dispatch = useDispatch();
  const cardStatus = useSelector(selectCardStatus);
  const cardErrorMessage = useSelector(selectCardErrorMessage);

  useEffect(() => {
    if (cardStatus === error) {
      console.log(cardErrorMessage);
    }
    if (cardStatus === pending) {
      setButtonText(textConservation);
    }
    if (cardStatus === success) {
      dispatch(closeAllPopup());
      setButtonText(textToCreate);
    }
  }, [cardStatus]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      addCard({
        name: cardNameRef.current.value,
        link: cardLinkRef.current.value,
      })
    );
  }

  function handleChangeCardLink(e) {
    setValidationMessageCardLink(e.target.validationMessage);
  }

  function handleChangeCardName(e) {
    setValidationMessageCardName(e.target.validationMessage);
  }
  useEffect(() => {
    cardLinkRef.current.value = '';
    cardNameRef.current.value = '';
  }, [isOpen]);

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
        className={popupInput}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeCardName}
      />
      <span className={`${popupInputSpan} ${popupInputSpanTypeError}`}>
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
      <span className={`${popupInputSpan} ${popupInputSpanTypeError}`}>
        {validationMessageCardLink}
      </span>
    </PopupWithForm>
  );
}
