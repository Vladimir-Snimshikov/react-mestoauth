export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-span',
  errorClass: 'popup__input-span_type_error',
};

export const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'b9863cd1-287b-423d-99c8-b51e7726ff28',
  },
};

export const tooltip = {
  message: 'Вы успешно зарегистрировались!',
  messageErr: 'Что-то пошло не так!Попробуйте ещё раз',
};
