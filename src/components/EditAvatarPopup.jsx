import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupWithForm from './PopupWithForm';
import { elemClasses, titleTexts } from '../utils/constans';
import { closeAllPopup } from '../store/popupSlice';
import {
  editUserInfoAvatar,
  selectUserInfoUpdateAvatarStatus,
  selectUserInfoUpdateAvatarErrorMessage,
} from '../store/currentUserInfoSlice';

export default function EditAvatarPopup({ isOpen, onClose }) {
  const { popupInput, popupInputSpan, popupInputSpanTypeError } = elemClasses;
  const { textUpdateAvatar } = titleTexts;
  const avatarRef = React.useRef();
  const dispatch = useDispatch();
  const userInfoUpdateAvatarErrorMessage = useSelector(
    selectUserInfoUpdateAvatarErrorMessage
  );
  const userInfoUpdateAvatarStatus = useSelector(
    selectUserInfoUpdateAvatarStatus
  );
  const [buttonText, setButtonText] = useState('Сохранить');
  const [validationMessageLink, setValidatorMessageLink] = useState('');

  useEffect(() => {
    if (userInfoUpdateAvatarStatus === 'pending') {
      setButtonText('Сохранение...');
    }
    if (userInfoUpdateAvatarStatus === 'success') {
      setButtonText('Сохранить');
      dispatch(closeAllPopup());
    }
    if (userInfoUpdateAvatarStatus === 'error') {
      setButtonText('Сохранить');
      dispatch(closeAllPopup());
      console.log(userInfoUpdateAvatarErrorMessage);
    }
  }, [userInfoUpdateAvatarStatus]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      editUserInfoAvatar({
        avatar: avatarRef.current.value,
      })
    );
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
