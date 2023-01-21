import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup({
  onClose,
  isOpen,
  onUpdateUser,
  buttonText,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [validationMessageName, setValidatorMessageName] = useState('');
  const [validationMessageDescription, setValidationMessagesetDescription] =
    useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    setValidatorMessageName(e.target.validationMessage);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setValidationMessagesetDescription(e.target.validationMessage);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={
        (validationMessageName === '') & (validationMessageDescription === '')
          ? false
          : true
      }
    >
      <input
        id="name-input"
        type="text"
        name="firstname"
        className="popup__input"
        placeholder="Жак-Ив Кусто"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__input-span popup__input-span_type_error">
        {validationMessageName}
      </span>
      <input
        id="profession-input"
        type="text"
        name="profession"
        className="popup__input"
        placeholder="Исследователь океана"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__input-span popup__input-span_type_error">
        {validationMessageDescription}
      </span>
    </PopupWithForm>
  );
}
