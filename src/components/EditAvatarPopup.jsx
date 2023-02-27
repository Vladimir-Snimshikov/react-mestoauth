import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupWithForm from './PopupWithForm';
import {
  elemClasses,
  titleTexts,
  status,
  saveButtonText,
} from '../utils/constans';
import { closeAllPopup } from '../store/popupSlice';
import {
  editUserInfoAvatar,
  selectUserInfoUpdateAvatarStatus,
  selectUserInfoUpdateAvatarErrorMessage,
} from '../store/currentUserInfoSlice';

const { popupInput, popupInputSpan, popupInputSpanTypeError } = elemClasses;
const { textUpdateAvatar } = titleTexts;
const { success, error, pending } = status;
const { textSave, textConservation } = saveButtonText;

export default function EditAvatarPopup({ isOpen, onClose }) {
  const avatarRef = React.useRef();
  const dispatch = useDispatch();
  const userInfoUpdateAvatarErrorMessage = useSelector(
    selectUserInfoUpdateAvatarErrorMessage
  );
  const userInfoUpdateAvatarStatus = useSelector(
    selectUserInfoUpdateAvatarStatus
  );
  const [buttonText, setButtonText] = useState(textSave);
  const [validationMessageLink, setValidatorMessageLink] = useState('');

  useEffect(() => {
    if (userInfoUpdateAvatarStatus === pending) {
      setButtonText(textConservation);
    }
    if (userInfoUpdateAvatarStatus === success) {
      setButtonText(textSave);
      dispatch(closeAllPopup());
    }
    if (userInfoUpdateAvatarStatus === error) {
      setButtonText(textSave);
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
