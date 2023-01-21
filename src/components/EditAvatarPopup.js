import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const avatarRef = React.useRef();

  const [validationMessageLink, setValidatorMessageLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  function handleChangeLink(e) {
    setValidatorMessageLink(e.target.validationMessage);
  }

  return (
    <PopupWithForm
      name="avatar-update"
      title="Обновить аватар"
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
        className="popup__input "
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
      />
      <span className="popup__input-span popup__input-span_type_error">
        {validationMessageLink}
      </span>{' '}
    </PopupWithForm>
  );
}
