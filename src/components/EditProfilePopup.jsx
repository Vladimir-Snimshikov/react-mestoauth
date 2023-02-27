import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { elemClasses, titleTexts } from '../utils/constans';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editUserInfo,
  selectUserInfo,
  selectUserUpdateInfoStatus,
  selectUserUpdateInfoErrorMessage,
} from '../store/currentUserInfoSlice';
import { closeAllPopup } from '../store/popupSlice';

export default function EditProfilePopup({ onClose, isOpen }) {
  const { popupInput, popupInputSpan, popupInputSpanTypeError } = elemClasses;
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const userInfoStatus = useSelector(selectUserUpdateInfoStatus);
  const userUpdateInfoErrorMessage = useSelector(
    selectUserUpdateInfoErrorMessage
  );

  const { textEditProfile } = titleTexts;
  const [buttonText, setButtonText] = useState('Сохранить');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [validationMessageName, setValidatorMessageName] = useState('');
  const [validationMessageDescription, setValidationMessagesetDescription] =
    useState('');

  useEffect(() => {
    setName(userInfo.name);
    setDescription(userInfo.about);
  }, [userInfo, isOpen]);

  useEffect(() => {
    if (userInfoStatus === 'pending') {
      setButtonText('Сохранение...');
    }
    if (userInfoStatus === 'success') {
      setButtonText('Сохранить');
      dispatch(closeAllPopup());
    }
    if (userInfoStatus === 'error') {
      setButtonText('Сохранить');
      dispatch(closeAllPopup());
      console.log(userUpdateInfoErrorMessage);
    }
  }, [userInfoStatus]);

  function handleChangeName(e) {
    setName(e.target.value);
    setValidatorMessageName(e.target.validationMessage);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setValidationMessagesetDescription(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      editUserInfo({
        name,
        about: description,
      })
    );
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title={textEditProfile}
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
        className={popupInput}
        placeholder="Жак-Ив Кусто"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className={`${popupInputSpan} ${popupInputSpanTypeError}`}>
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
      <span className={`${popupInputSpan} ${popupInputSpanTypeError}`}>
        {validationMessageDescription}
      </span>
    </PopupWithForm>
  );
}
