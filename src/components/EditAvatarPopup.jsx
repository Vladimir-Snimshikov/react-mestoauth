import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';
import { elemClasses, titleTexts } from '../utils/constans';
import { useEffect } from 'react';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const { popupInput, popupInputSpan, popupInputSpanTypeError } = elemClasses;
  const { textUpdateAvatar } = titleTexts;
  const avatarRef = React.useRef();

  const [validationMessageLink, setValidatorMessageLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeLink(e) {
    setValidatorMessageLink(e.target.validationMessage);
  }
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar-update"
      title={textUpdateAvatar}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={validationMessageLink === '' ? false : true}
    >
      <input
        id="url-avatar-input"
        type="url"
        name="avatar"
        ref={avatarRef}
        className={popupInput}
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
      />
      <span className={`${popupInputSpan} ${popupInputSpanTypeError}`}>
        {validationMessageLink}
      </span>{' '}
    </PopupWithForm>
  );
}
