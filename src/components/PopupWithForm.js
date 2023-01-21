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
      className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ''}`}
    >
      <form
        className="popup__container popup__form"
        onSubmit={onSubmit}
        name={name}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          disabled={validity}
          type="submit"
          className={`popup__submit-button ${
            validity ? 'popup__submit-button_disabled' : ''
          }`}
          aria-label="сохранить изменения"
        >
          {buttonText}
        </button>
        <button
          type="button"
          className="popup__exit-button"
          aria-label="закрыть форму"
        ></button>
      </form>
    </div>
  );
}
