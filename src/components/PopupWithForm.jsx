import { elemClasses } from '../utils/constans';

const {
  popup,
  popupOpened,
  popupContainer,
  popupForm,
  popupTitle,
  popupSubmiButton,
  popupSubmitButtonDisabled,
  popupExitButton,
} = elemClasses;

export default function PopupWithForm({
  onClose,
  name,
  title,
  children,
  buttonText,
  isOpen,
  onSubmit,
  validity,
}) {
  return (
    <div
      onClick={onClose}
      className={`${popup} popup_type_${name} ${isOpen ? popupOpened : ''}`}
    >
      <form
        className={`${popupContainer} ${popupForm}`}
        onSubmit={onSubmit}
        name={name}
        noValidate
      >
        <h2 className={popupTitle}>{title}</h2>
        {children}
        <button
          disabled={validity}
          type="submit"
          className={`${popupSubmiButton} ${
            validity ? popupSubmitButtonDisabled : ''
          }`}
          aria-label="сохранить изменения"
        >
          {buttonText}
        </button>
        <button
          type="button"
          className={popupExitButton}
          aria-label="закрыть форму"
        ></button>
      </form>
    </div>
  );
}
